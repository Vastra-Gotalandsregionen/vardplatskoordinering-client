import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  public dialogRef: MatDialogRef<LoginDialogComponent>;

  constructor(dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
  }

  loggedIn() {
    this.dialogRef.close();
  }
}
