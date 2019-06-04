import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../domain/FieldConfig';

@Component({
  selector: 'app-generic-edit-dialog',
  templateUrl: './generic-edit-dialog.component.html',
  styleUrls: ['./generic-edit-dialog.component.scss']
})
export class GenericEditDialogComponent implements OnInit {

  @Output() save: EventEmitter<Registrera> = new EventEmitter<Registrera>();

  formGroup: FormGroup;

  item: any;
  fieldsConfigs: FieldConfig[];

  constructor(public dialogRef: MatDialogRef<GenericEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {item: any, fieldsConfigs: FieldConfig[]}) {
    this.item = data.item;
    this.fieldsConfigs = data.fieldsConfigs;
    this.dialogRef.addPanelClass('vpk-dialog');
  }

  ngOnInit() {
    const group: any = {};
    this.fieldsConfigs.forEach(fieldConfig => {
      group[fieldConfig.name] = new FormControl(this.getValue(fieldConfig, this.item, fieldConfig.name));
      // group[field.name] = new FormControl(this.item[field.name]);
    });

    this.formGroup = new FormGroup((group));
  }

  getValue(fieldConfig: FieldConfig, item: any, fieldName: string) {
    const parts = fieldName.split('.');

    // Take care of fieldNames which are dot-separated.
    let value = item;
    for (const part of parts) {
      if (value instanceof Array) {
        value = value.map(j => j[part]);
        break;
      }

      if (!value) {
        value = {};
      }

      value = value[part];
    }

    if (fieldConfig.type === 'select') {
      const found = fieldConfig.options.find(option => option.value === value);
      return found ? found.value : null;
    } else if (fieldConfig.type === 'multiselect') {
      let valueArray = value as Array<string>;

      if (!valueArray) {
        valueArray = [];
      }

      const arrayValues = fieldConfig.options
        .filter(option => valueArray.indexOf(option.value) > -1)
        .map(option => option.value);
      return arrayValues;
    }

    return value;
  }

  saveAndEmit() {
    const model = this.formGroup.value;
    this.fieldsConfigs.forEach(field => {

      const parts = field.name.split('.');

      // Take care of fieldNames which are dot-separated.
      let value = this.item;
      parts.forEach((part, index) => {
        // Is last?
        if (index === parts.length - 1) {
          value[part] = model[field.name];
        } else {
          if (!value[part]) {
            value[part] = {};
          }
          value = value[part];
        }
      });

    });

    this.dialogRef.close();
    this.save.emit(this.item);
  }

  cancel() {
    this.dialogRef.close();
  }
}
