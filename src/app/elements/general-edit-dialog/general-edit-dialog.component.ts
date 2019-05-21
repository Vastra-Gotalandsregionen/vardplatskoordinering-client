import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../domain/FieldConfig';

@Component({
  selector: 'app-general-edit-dialog',
  templateUrl: './general-edit-dialog.component.html',
  styleUrls: ['./general-edit-dialog.component.scss']
})
export class GeneralEditDialogComponent implements OnInit {

  @Output() save: EventEmitter<Registrera> = new EventEmitter<Registrera>();

  formGroup: FormGroup;

  item: any;
  fieldsConfigs: FieldConfig[];

  constructor(public dialogRef: MatDialogRef<GeneralEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {item: any, fieldsConfigs: FieldConfig[]}) {
    this.item = data.item;
    this.fieldsConfigs = data.fieldsConfigs;
  }

  ngOnInit() {
    const group: any = {};
    this.fieldsConfigs.forEach(field => {
      group[field.name] = new FormControl(this.item[field.name]);
    });

    this.formGroup = new FormGroup((group));
  }

  saveAndEmit() {
    const model = this.formGroup.value;
    this.fieldsConfigs.forEach(field => {
      this.item[field.name] = model[field.name];
    });

    this.dialogRef.close();
    this.save.emit(this.item);
  }

  cancel() {
    this.dialogRef.close();
  }
}
