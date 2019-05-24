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

    let value = item;
    for (const part of parts) {
      if (value instanceof Array) {
        value = value.map(j => j[part])/*.join(', ')*/;
        break;
      }
      value = value[part];
    }

    if (fieldConfig.type === 'select') {
      return fieldConfig.options.find(option => option.value === value).label;
    } else if (fieldConfig.type === 'multiselect') {
      const valueArray = value as Array<string>;
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

      let value = this.item;
      parts.forEach((part, index, array) => {
        // Is last?
        if (index === parts.length - 1) {
          value[part] = model[field.name];
        } else {
          value = value[part];
        }
      });

     /* let value = this.item;
      for (const part of parts.slice(0, parts.length - 2)) {
        if (value instanceof Array) {
          value = value.map(j => j[part])/!*.join(', ')*!/;
          break;
        }
        value = value[part];
      }

      debugger;
      value = model[field.name];*/
    });

    this.dialogRef.close();
    this.save.emit(this.item);
  }

  cancel() {
    this.dialogRef.close();
  }
}
