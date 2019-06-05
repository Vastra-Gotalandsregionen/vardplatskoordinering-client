import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {

  @Output() confirmDelete: EventEmitter<any> = new EventEmitter<any>();

  item: any;

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {item: any}) {
    this.item = data.item;
    this.dialogRef.addPanelClass('vpk-dialog');
  }

  ngOnInit() {
  }

  confirm() {
    this.confirmDelete.emit(this.item);
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}
