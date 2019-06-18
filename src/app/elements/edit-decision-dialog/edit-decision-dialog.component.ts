import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AkutenTrappa } from '../../domain/AkutenTrappa';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Management } from '../../domain/Management';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-edit-decision-dialog',
  templateUrl: './edit-decision-dialog.component.html',
  styleUrls: ['./edit-decision-dialog.component.scss']
})
export class EditDecisionDialogComponent implements OnInit {

  @Output() save: EventEmitter<AkutenTrappa> = new EventEmitter<AkutenTrappa>();
  @Output() delete: EventEmitter<AkutenTrappa> = new EventEmitter<AkutenTrappa>();

  akutenTrappa: AkutenTrappa;
  management: Management;
  newDecision = false;
  formGroup: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditDecisionDialogComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { akutenTrappa: AkutenTrappa, management: Management, newDecision: boolean }) {
    this.akutenTrappa = data.akutenTrappa;
    this.management = data.management;
    this.newDecision = data.newDecision;
    const at = this.akutenTrappa;

    this.formGroup = new FormGroup({
      id: new FormControl(at.id),
      vardplatstrappa: new FormControl(at.vardplatstrappa, [Validators.required, Validators.min(0), Validators.max(4)]),
      beslut: new FormControl(at.beslut, Validators.required),
    });
  }

  ngOnInit() {
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
    this.akutenTrappa.id = model.id;
    this.akutenTrappa.vardplatstrappa = model.vardplatstrappa;
    this.akutenTrappa.beslut = model.beslut;

    this.dialogRef.close();
    this.save.emit(this.akutenTrappa);
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
        this.akutenTrappa.id = model.id;
        this.akutenTrappa.vardplatstrappa = model.vardplatstrappa;
        this.akutenTrappa.beslut = model.beslut;

        this.dialogRef.close();
        this.delete.emit(this.akutenTrappa);
      } else {
        this.cancel();
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
