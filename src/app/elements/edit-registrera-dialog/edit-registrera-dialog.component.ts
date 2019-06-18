import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-edit-registrera-dialog',
  templateUrl: './edit-registrera-dialog.component.html',
  styleUrls: ['./edit-registrera-dialog.component.scss']
})
export class EditRegistreraDialogComponent {

  formGroup: FormGroup;

  registrera: Registrera;
  administrationName: string;
  newRegistration = false;

  @Output() save: EventEmitter<Registrera> = new EventEmitter<Registrera>();
  @Output() delete: EventEmitter<Registrera> = new EventEmitter<Registrera>();

  constructor(public dialogRef: MatDialogRef<EditRegistreraDialogComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { registrera: Registrera, administrationName: string, newRegistration: boolean }) {
    this.registrera = data.registrera;
    this.administrationName = data.administrationName;
    const r = this.registrera;
    this.newRegistration = data.newRegistration;
    this.formGroup = new FormGroup({
      dispVpl: new FormControl(r.dispVpl, Validators.required),
      inneliggande: new FormControl(r.inneliggande, Validators.required),
      fysTillaten: new FormControl(r.fysTillaten, Validators.required),
      prognosFore: new FormControl(r.prognosFore, Validators.required),
      pg: new FormControl(r.pg, Validators.required),
      kommentar: new FormControl(r.kommentar)
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
    this.registrera.dispVpl = model.dispVpl;
    this.registrera.inneliggande = model.inneliggande;
    this.registrera.fysTillaten = model.fysTillaten;
    this.registrera.prognosFore = model.prognosFore;
    this.registrera.pg = model.pg;
    this.registrera.kommentar = model.kommentar;

    this.dialogRef.close();
    this.save.emit(this.registrera);
  }

  deleteAndEmit() {
    const res = true;
    const dialogRef2 = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: {item: res}
    });

    dialogRef2.componentInstance.confirmDelete.subscribe(ok => {
      if (ok === true) {
        const model = this.formGroup.value;
        this.registrera.dispVpl = model.dispVpl;
        this.registrera.inneliggande = model.inneliggande;
        this.registrera.fysTillaten = model.fysTillaten;
        this.registrera.prognosFore = model.prognosFore;
        this.registrera.pg = model.pg;
        this.registrera.kommentar = model.kommentar;
        this.dialogRef.close();
        this.delete.emit(this.registrera);
      } else {
        this.cancel();
      }
    });
  }
}
