import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const authenticated = this.authService.isAuthenticated();

    if (!authenticated) {
      return this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
    }

    return authenticated;
  }
}
