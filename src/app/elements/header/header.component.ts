import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { StateService } from '../../service/state.service';
import { AuthService } from '../../service/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { HttpClient } from '@angular/common/http';
import { Management } from '../../domain/Management';
import { from } from 'rxjs';
import { concatMap, map, toArray } from 'rxjs/operators';
import { Administration } from '../../domain/Administration';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  managementName: string;
  administrationsString: string;
  hasApplicationAdministrationPermission: boolean;

  constructor(private authService: AuthService,
              private stateService: StateService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.authService.isUserLoggedIn.subscribe(_ => {
      const managementId = this.authService.getManagementId();
      if (managementId) {
        this.http.get<Management>('/api/management/' + managementId).subscribe(m => {
          this.managementName = m.name;
        });
      } else {
        this.managementName = '';
      }

      // const administrationsTemp = [];
      const administrationids = this.authService.getAdministrationIds();
      from(administrationids).pipe(
        concatMap(id => this.http.get<Administration>('/api/administration/' + id)),
        map(a => a.verks),
        // tap(name => administrationsTemp.push(name)),
        toArray()
      ).subscribe(nameArray => this.administrationsString = nameArray.join(', '));

      this.hasApplicationAdministrationPermission = this.authService.hasApplicationAdministrationPermission;
    });
  }

  openLogin() {

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'vpk-dialog'
    };

    const dialogRef: MatDialogRef<LoginDialogComponent> = this.dialog.open(LoginDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  logout() {
    this.authService.resetAuth();
    this.router.navigate(['/']);
  }

  getShowContentEdit(): boolean {
    return this.stateService.showContentEdit;
  }

  setShowContentEdit(value: boolean) {
    this.stateService.showContentEdit = value;
  }

  getShowDebug(): boolean {
    return this.stateService.showDebug;
  }

  setShowDebug(value: boolean) {
    this.stateService.showDebug = value;
  }

  getLoggedInDisplayName() {
    return this.authService.getLoggedInDisplayName();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  getLoggedInUserId(): string {
    return this.authService.getLoggedInUserId();
  }

  userAvatarBackgroundImageStyle(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle('url(/api/user/' + this.getLoggedInUserId() + '/thumbnailPhoto)');
  }

  get showProgress() {
    return this.stateService.showProgress;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  get roles() {
    return this.authService.getRolesString();
  }
}
