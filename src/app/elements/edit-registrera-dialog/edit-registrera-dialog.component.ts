import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-registrera-dialog',
  templateUrl: './edit-registrera-dialog.component.html',
  styleUrls: ['./edit-registrera-dialog.component.scss']
})
export class EditRegistreraDialogComponent {

  formGroup: FormGroup;

  private registrera: Registrera;

  @Output('save') save: EventEmitter<Registrera> = new EventEmitter<Registrera>();

  constructor(public dialogRef: MatDialogRef<EditRegistreraDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { registrera: Registrera }) {
    this.registrera = data.registrera;
    const r = this.registrera;

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
}
