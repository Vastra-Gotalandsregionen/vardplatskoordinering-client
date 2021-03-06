import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenResponse } from '../domain/token-response';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { retry, tap } from 'rxjs/operators';
import { GlobalStateService } from './global-state.service';

@Injectable()
export class AuthService {

  renewSubscription: Subscription;
  jwtHelper = new JwtHelperService();

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentManagementId: number;
  public hasApplicationAdministrationPermission = false;
  public hasAdministrationAdministrationPermission = false;
  public hasUnitAdministrationPermission = false;

  constructor(private http: HttpClient,
              private router: Router,
              private globalStateService: GlobalStateService) {

    const localStorageToken = localStorage.getItem('jwtToken');

    if (localStorageToken) {
      this.jwt = localStorageToken;
    }

    if (this.isTokenExpired()) {
      this.resetAuth();
    }

    interval(10000)
      .subscribe(_ => {
        if (this.isTokenExpired()) {
          this.resetAuth();
        }
      });

    this.globalStateService.getManagementId().subscribe(managementId => this.currentManagementId = managementId);
  }

  public renewJwt() {
    if (!this.jwt) {
      return;
    }

    this.http.post('/api/login/renew', this.jwt).pipe(
      retry(4)
    ).subscribe(
      (response: TokenResponse) => this.jwt = response.token,
      error => {
        this.jwt = null;
        if (this.renewSubscription) {
          this.renewSubscription.unsubscribe();
        }
      }
    );
  }

  private startRenew() {
    if (this.renewSubscription) {
      this.renewSubscription.unsubscribe();
    }

    this.renewSubscription = interval(60000)
      .pipe(
        tap(_ => this.renewJwt()
      )).subscribe();
  }

  isTokenExpired() {
    const token = this.getToken();
    return token && (token.exp - new Date().getTime() / 1000 < 0);
  }

  getToken(): any {
    const jwtTokenString = this.jwt;
    return jwtTokenString ? this.jwtHelper.decodeToken(jwtTokenString) : null;
  }

  isAuthenticated(): boolean {
    return this.getToken() && !this.isTokenExpired();
  }

  get jwt(): string {
    return localStorage.getItem('jwtToken');
  }

  set jwt(value: string) {

    if (value) {

      localStorage.setItem('jwtToken', value);

      this.startRenew();
    } else if (this.getToken()) {
      // Logout

      this.router.navigate(['/']);
      localStorage.removeItem('jwtToken');
    }

    this.hasAdministrationAdministrationPermission = this.hasAnyOfRoles(['VPK_MANAGER', 'VPL_MANAGER', 'ADMIN']);
    this.hasApplicationAdministrationPermission = this.hasAnyOfRoles(['VPK_MANAGER', 'VPL_MANAGER', 'ADMIN']);
    this.hasUnitAdministrationPermission = this.hasAnyOfRoles(['VPL_MANAGER', 'ADMIN']);

    this.isUserLoggedIn.next(this.isAuthenticated());
  }

  public hasAnyOfRoles(toFind: string[]) {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const roles = token.roles as string[];

    if (roles.some(role => toFind.indexOf(role) > -1)) {
      return true;
    } else {
      return false;
    }
  }

  resetAuth() {
    this.jwt = null;
    this.globalStateService.setManagementId(null);
  }

  getLoggedInUserId(): string {
    const token = this.getToken();
    return token ? token.sub : null;
  }

  getLoggedInDisplayName(): string {
    const token = this.getToken();
    return token ? token.displayName : null;
  }

  isAdmin() {
    const token = this.getToken();
    if (token) {
      const roles = token.roles as string[];
      return roles.indexOf('ADMIN') > -1;
    }

    return false;
  }

  getUnitIds(): string[] {
    const token = this.getToken();
    if (token) {
      return token.unitIds as string[];
    } else {
      return [];
    }
  }

  hasVpkEditPermission(administrationId): boolean {
    const token = this.getToken();

    if (token && token.administrationIds) {
      return token.administrationIds.indexOf(administrationId) > -1 && this.hasAnyOfRoles(['VPK']);
    } else {
      return false;
    }
  }

  hasVpkManagementAdminPermissionGlobal(): boolean {
    const token = this.getToken();
    if (token) {
      return this.isAdmin() || token.roles.indexOf('VPK_MANAGER') > -1;
    } else {
      return false;
    }
  }

  hasVplManagementAdminPermissionGlobal(): boolean {
    const token = this.getToken();
    if (token) {
      return this.isAdmin() || token.roles.indexOf('VPL_MANAGER') > -1;
    } else {
      return false;
    }
  }

  hasVpkManagementAdminPermission(managementId: number): boolean {
    return this.hasManagerRoleCommon('VPK_MANAGER', managementId);
  }

  /*hasVplManagementAdminPermission(managementId: number): boolean {
    return this.hasManagerRoleCommon('VPL_MANAGER', managementId);
  }*/

  private hasManagerRoleCommon(role: string, managementId: number) {
    const token = this.getToken();
    if (token) {
      return this.isAdmin()
        || (token.managementId === managementId && token.roles.indexOf(role) > -1);
    } else {
      return false;
    }
  }

  hasEditUnitPermission(unitId: string): boolean {
    return this.isAdmin() || this.getUnitIds().indexOf(unitId) > -1;
  }

  canImpersonate() {
    const token = this.getToken();
    if (token) {
      const roles = token.roles as string[];
      return roles.indexOf('IMPERSONATE') > -1;
    }

    return false;
  }


  getRoles(): string[] {
    const token = this.getToken();
    if (token) {
      return token.roles as string[];
    }

    return [];
  }

  getRolesString() {
    const token = this.getToken();
    if (token) {
      const roles = token.roles as string[];

      return roles.join(', ');
    }

    return '';
  }

  getManagementId(): number {
    const token = this.getToken();
    if (token) {
      return token.managementId;
    }

    return null;
  }

  getAdministrationIds(): number[] {
    const token = this.getToken();
    if (token) {
      return token.administrationIds;
    }

    return [];
  }

  authorizedToUnitVpl(id: number) {
    return this.hasAnyOfRoles(['ADMIN', 'VPL_MANAGER'])
      || (this.getUnitIds().indexOf(id.toString()) > -1 && this.hasAnyOfRoles(['VPL']));
  }
}
