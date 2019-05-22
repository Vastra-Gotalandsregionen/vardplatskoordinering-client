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
              private sanitizer: DomSanitizer) { }

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

  getValue(fieldConfig: FieldConfig, value: string) {
    if (fieldConfig.type === 'select') {
      return fieldConfig.options.find(option => option.value === value).label;
    }

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

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
