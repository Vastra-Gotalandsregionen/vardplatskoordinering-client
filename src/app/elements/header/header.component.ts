import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { StateService } from '../../service/state.service';
import { AuthService } from '../../service/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private stateService: StateService,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
  }

  openLogin() {

    const dialogConfig: MatDialogConfig = {
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'apk-dialog'
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

}
