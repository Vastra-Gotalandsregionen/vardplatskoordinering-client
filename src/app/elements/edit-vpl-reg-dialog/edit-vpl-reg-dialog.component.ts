import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VplReg } from '../../domain/vpl-reg';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-vpl-reg-dialog',
  templateUrl: './edit-vpl-reg-dialog.component.html',
  styleUrls: ['./edit-vpl-reg-dialog.component.scss']
})
export class EditVplRegDialogComponent implements OnInit {

  formGroup: FormGroup;

  @Output() save: EventEmitter<VplReg> = new EventEmitter<VplReg>();

  vplReg: VplReg;
  unitName: string;
  obRumOptions: string[] = ['Läkarrum', 'Korridor', 'Behandlingsrum', 'Burspråk', 'Dagrum'];

  constructor(public dialogRef: MatDialogRef<EditVplRegDialogComponent>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: { vplReg: VplReg, unitName: string }) {
    this.vplReg = data.vplReg;
    this.unitName = data.unitName;
    const r = this.vplReg;

    this.formGroup = new FormGroup({
      max: new FormControl(r.max, Validators.required),
      inneliggande: new FormControl(r.inneliggande, Validators.required),
      hem: new FormControl(r.hem, Validators.required),
      hemp: new FormControl(r.hemp, Validators.required),
      planIn: new FormControl(r.planIn, Validators.required),
      medFardigbehandlade: new FormControl(r.medFardigbehandlade),
      ob1: new FormControl(r.ob1),
      ob1Rum: new FormControl(r.ob1Rum),
      ob2: new FormControl(r.ob2),
      ob2Rum: new FormControl(r.ob2Rum),
      ob3: new FormControl(r.ob3),
      ob3Rum: new FormControl(r.ob3Rum),
    });
  }

  ngOnInit() {
  }

  cancel() {
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
    this.vplReg.max = model.max;
    this.vplReg.inneliggande = model.inneliggande;
    this.vplReg.hem = model.hem;
    this.vplReg.hemp = model.hemp;
    this.vplReg.planIn = model.planIn;
    this.vplReg.medFardigbehandlade = model.medFardigbehandlade;
    this.vplReg.ob1 = model.ob1;
    this.vplReg.ob1Rum = model.ob1Rum;
    this.vplReg.ob2 = model.ob2;
    this.vplReg.ob2Rum = model.ob2Rum;
    this.vplReg.ob3 = model.ob3;
    this.vplReg.ob3Rum = model.ob3Rum;


    this.http.put<VplReg>('/api/vpl-reg', this.vplReg)
      .subscribe(result => {
        this.dialogRef.close();
        this.save.emit(result);
      });
  }
}
