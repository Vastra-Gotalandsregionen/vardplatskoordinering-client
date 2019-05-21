import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { GeneralEditDialogComponent } from '../general-edit-dialog/general-edit-dialog.component';
import { FieldConfig } from '../../domain/FieldConfig';
import { BasicEditDataSource } from '../../service/BasicEditDataSource';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  @Input() fieldConfigs: FieldConfig[];
  @Input() dataSource: BasicEditDataSource<any>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openEdit(item: any) {
    const fieldsConfigs: FieldConfig[] = this.fieldConfigs;
    const dialogRef = this.dialog.open(GeneralEditDialogComponent, {
      width: '500px',
      data: {item, fieldsConfigs}
    });

    dialogRef.componentInstance.save.subscribe(itemToSave => {
      this.dataSource.save(itemToSave).subscribe(result => console.log('saved ' + result));
    });
  }

  getColumns() {
    return this.fieldConfigs.map(value => value.name).concat('edit');
  }
}
