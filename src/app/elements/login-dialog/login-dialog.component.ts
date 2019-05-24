import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StateService } from '../../service/state.service';
import { AuthService } from '../../service/auth.service';
import { TokenResponse } from '../../domain/token-response';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public dialogRef: MatDialogRef<LoginDialogComponent>;

  @ViewChild(NgForm) form: NgForm;

  userId: string;
  password: string;

  loginMessage: string;

  constructor(dialogRef: MatDialogRef<LoginDialogComponent>,
              private http: HttpClient,
              private stateService: StateService,
              private authService: AuthService) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
  }

  login() {
    this.http.post('/api/login', {username: this.userId, password: this.password})
      .subscribe((response: TokenResponse) => {

        this.dialogRef.close(response);

        this.authService.jwt = response.token;
      });
  }


}
