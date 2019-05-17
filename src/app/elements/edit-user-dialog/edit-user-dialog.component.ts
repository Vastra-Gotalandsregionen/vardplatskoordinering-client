import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../../domain/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent {

  formGroup: FormGroup;

  user: User;

  @Output() save: EventEmitter<User> = new EventEmitter<User>();

  constructor(public dialogRef: MatDialogRef<EditUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { user: User }) {
    this.user = data.user;
    const r = this.user;

    this.formGroup = new FormGroup({
      id: new FormControl(r.id),
      name: new FormControl(r.name, Validators.required),
      username: new FormControl(r.username, Validators.required)/*,
      prognosFore: new FormControl(r.prognosFore, Validators.required),
      pg: new FormControl(r.pg, Validators.required),
      kommentar: new FormControl(r.kommentar)*/
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveAndEmit() {
    if (!this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(field => {
        const control = this.formGroup.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }

    const model = this.formGroup.value;
    this.user.id = model.id;
    this.user.name = model.name;
    this.user.username = model.username;
    /*this.user.prognosFore = model.prognosFore;
    this.user.pg = model.pg;
    this.user.kommentar = model.kommentar;*/

    this.dialogRef.close();
    this.save.emit(this.user);
  }
}
