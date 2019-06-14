import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Registrera } from '../../domain/Registrera';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig, Option } from '../../domain/FieldConfig';

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
  possiblyMarkCkEditorAsTouched = false;

  constructor(public dialogRef: MatDialogRef<GenericEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: any, fieldsConfigs: FieldConfig[] }) {
    this.item = data.item;
    this.fieldsConfigs = data.fieldsConfigs;
    this.dialogRef.addPanelClass('vpk-dialog');
  }

  ngOnInit() {
    const group: any = {};
    this.fieldsConfigs.forEach(fieldConfig => {
      const formControl = new FormControl(this.getValue(fieldConfig, this.item, fieldConfig.name));

      if (fieldConfig.required) {
        formControl.setValidators(Validators.required);
      }

      group[fieldConfig.name] = formControl;
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
    if (!this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(field => {
        const control = this.formGroup.get([field]);
        control.markAsTouched({onlySelf: true});
        this.possiblyMarkCkEditorAsTouched = true;
      });
      return;
    }

    const model = this.formGroup.value;
    this.fieldsConfigs.forEach(field => {

      const parts = field.name.split('.');

      // Take care of fieldNames which are dot-separated.
      let entity = this.item;
      parts.forEach((part, index) => {
        // Is last?
        if (index === parts.length - 1) {
          const fieldConfig = this.fieldsConfigs.find(fc => fc.name === field.name);

          if (fieldConfig.type === 'multiselect') {
            this.setWhatUserIsAuthorizedToSet(entity, part, model[field.name], fieldConfig.options);
          } else {
            entity[part] = model[field.name];
          }
        } else {
          if (!entity[part]) {
            entity[part] = {};
          }
          entity = entity[part];
        }
      });

    });

    this.dialogRef.close();
    this.save.emit(this.item);
  }

  cancel() {
    this.dialogRef.close();
  }

  // So we don't remove options involuntarily, just because we don't see those options.
  private setWhatUserIsAuthorizedToSet(entity: any, part: string, modelValues: any[], options: Option[]) {
    const authorizedValues = options.map(o => o.value);
    const previousValues = entity[part] as any[] || [];
    const previousValuesWithRemovedItems = previousValues
      .filter(pv => (modelValues.indexOf(pv) > -1) || !(authorizedValues.indexOf(pv) > -1));

    const result = previousValuesWithRemovedItems;
    // Filter out those not already in value, and add them
    modelValues.filter(mv => !(previousValuesWithRemovedItems.indexOf(mv) > -1)).forEach(mv => result.push(mv));

    entity[part] = result;
  }
}
