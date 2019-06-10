import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VplReg } from '../../domain/vpl-reg';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material';
import { EditVplRegDialogComponent } from '../edit-vpl-reg-dialog/edit-vpl-reg-dialog.component';

@Component({
  selector: 'app-vpl-table',
  templateUrl: './vpl-table.component.html',
  styleUrls: ['./vpl-table.component.scss']
})
export class VplTableComponent implements OnInit {

  @Input() dataSource: VplReg[];
  @Output() saveEvent = new EventEmitter();

  regDisplayedColumns = ['avd', 'regtid', 'max', 'inneliggande', 'hem', 'hemp', 'planIn', 'medFardigbehandlade', 'ob', 'prognosis',
    'actions'];

  constructor(private authService: AuthService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  hasEditPermission(id: number) {
    return this.authService.authorizedToUnit(id);
  }

  edit(vplReg: VplReg) {
    const dialogRef = this.dialog.open(EditVplRegDialogComponent, {
      width: '500px',
      panelClass: 'vpk-card-wrapper',
      data: {vplReg, unitName: vplReg.avd}
    });

    dialogRef.componentInstance.save.subscribe((result: VplReg) => {

      this.saveEvent.emit(result);
      /*if (result) {
        this.http.put('/api/akutenTrappa', result).subscribe(() => {
          this.updateDecisions();
        });
      }*/
    });
  }
}
