import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../domain/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent {

  // formGroup: FormGroup;

  user: User;

  filter: string;

  @Output() save: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<CreateUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
    this.user = data.user;
    // const r = this.users;

    /*this.formGroup = new FormGroup({
      id: new FormControl(r.id),
      name: new FormControl(r.name, Validators.required),
      username: new FormControl(r.username, Validators.required)/!*,
      prognosFore: new FormControl(r.prognosFore, Validators.required),
      pg: new FormControl(r.pg, Validators.required),
      kommentar: new FormControl(r.kommentar)*!/
    });*/
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveAndEmit() {
    /*if (!this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(field => {
        const control = this.formGroup.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }

    const model = this.formGroup.value;
    this.users.id = model.id;
    this.users.name = model.name;
    this.users.username = model.username;
    /!*this.user.prognosFore = model.prognosFore;
    this.user.pg = model.pg;
    this.user.kommentar = model.kommentar;*!/

    this.dialogRef.close();
    this.save.emit(this.users);*/
  }

  findFromServer(): void {
    const observable = this.http.get('/api/vgr-user?filter=' + this.filter);
    observable.subscribe((o: User[]) => {
      console.log('Found', o);
      // this.user = o;
    });
  }
}
