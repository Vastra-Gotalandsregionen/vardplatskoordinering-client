import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GenericEditDialogComponent } from '../generic-edit-dialog/generic-edit-dialog.component';
import { FieldConfig } from '../../domain/FieldConfig';
import { BasicEditDataSource } from '../../service/BasicEditDataSource';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  @Input() fieldConfigs: FieldConfig[];
  @Input() dataSource: BasicEditDataSource<any>;
  @Input() heading: string;

  constructor(public dialog: MatDialog,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  openEdit(item: any) {
    const fieldsConfigs: FieldConfig[] = this.fieldConfigs;
    const dialogRef = this.dialog.open(GenericEditDialogComponent, {
      width: '500px',
      data: {item, fieldsConfigs}
    });

    dialogRef.componentInstance.save.subscribe(itemToSave => {
      this.dataSource.save(itemToSave).subscribe(result => this.dataSource.load());
    });
  }

  getColumns() {
    return this.fieldConfigs.map(value => value.name).concat('edit');
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
      return fieldConfig.options
        .filter(option => valueArray.indexOf(option.value) > -1)
        .map(option => option.label)
        .join(', ');
      // debugger;
    }

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

  /*
  const parts = fieldName.split('.');

    let value = item;
    for (const part of parts) {
      if (value instanceof Array) {
        value = value.map(j => j[part]).join(', ');
        break;
      }
      value = value[part];
    }
   */
  confirmDelete(item: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: {item}
    });

    dialogRef.componentInstance.confirmDelete.subscribe(itemToSave => {
      this.dataSource.delete(itemToSave).subscribe(result => {
        this.dataSource.load();
      });
    });
  }

  openAdd() {
    this.openEdit({});
  }
}
