import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-registrera-dialog',
  templateUrl: './edit-registrera-dialog.component.html',
  styleUrls: ['./edit-registrera-dialog.component.scss']
})
export class EditRegistreraDialogComponent {

  formGroup: FormGroup;

  private registrera: Registrera;

  constructor(public dialogRef: MatDialogRef<EditRegistreraDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {registrera: Registrera}) {
    this.registrera = data.registrera;
    const r = this.registrera;

    this.formGroup = new FormGroup({
      dispVpl: new FormControl(r.dispVpl),
      inneliggande: new FormControl(r.inneliggande),
      fysTillaten: new FormControl(r.fysTillaten),
      prognosFore: new FormControl(r.prognosFore),
      pg: new FormControl(r.pg),
      kommentar: new FormControl(r.kommentar)
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    const model = this.formGroup.value;
    this.registrera.dispVpl = model.dispVpl;
    this.registrera.inneliggande = model.inneliggande;
    this.registrera.fysTillaten = model.fysTillaten;
    this.registrera.prognosFore = model.prognosFore;
    this.registrera.pg = model.pg;
    this.registrera.kommentar = model.kommentar;
  }
}
