import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VplReg } from '../../domain/vpl-reg';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { EditVplRegDialogComponent } from '../edit-vpl-reg-dialog/edit-vpl-reg-dialog.component';
import { CalculateUtil } from '../../util/calculate-util';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-vpl-table',
  templateUrl: './vpl-table.component.html',
  styleUrls: ['./vpl-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('togglerExpand', [
      state('collapsed', style({transform: 'rotate(0)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class VplTableComponent implements OnInit {

  @Input() dataSource: VplReg[];
  @Output() saveEvent = new EventEmitter();

  regDisplayedColumns = ['avd', 'regtid', 'max', 'inneliggande', 'hem', 'hemp', 'planIn', 'medFardigbehandlade', 'ob', 'prognosis',
    'actions'];

  expandedElement: any;

  today = new Date().toISOString().slice(0, 10);

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private breakpointObserver: BreakpointObserver) {
                breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {

                  this.regDisplayedColumns = result.matches ?
                    ['toggleExpand', 'avd', 'prognosis', 'actions'] :
                    ['avd', 'regtid', 'max', 'inneliggande', 'hem', 'hemp', 'planIn', 'medFardigbehandlade', 'ob', 'prognosis', 'actions'];
                });

  }

  ngOnInit() {
  }

  hasEditPermission(reg: VplReg) {
    return this.authService.authorizedToUnitVpl(reg.avdid) && reg.datum === this.today;
  }

  edit(vplReg: VplReg) {
    const dialogRef = this.dialog.open(EditVplRegDialogComponent, {
      width: '500px',
      panelClass: 'vpk-card-wrapper',
      data: {vplReg, unitName: vplReg.avd}
    });

    dialogRef.componentInstance.save.subscribe((result: VplReg) => {

      this.saveEvent.emit(result);
    });
  }

  calculatePrognosis(reg: VplReg) {
    return CalculateUtil.calculatePrognosis(reg);
  }

  sum(vplRegs: VplReg[], field: string) {
    return vplRegs.reduce((previousValue, currentValue) => previousValue + (currentValue[field] || 0), 0);
  }

  sumMultipleFields(vplRegs: VplReg[], fields: string[]) {
    return CalculateUtil.sumMultipleFields(vplRegs, fields);
  }

  sumPrognosis(vplRegs: VplReg[]) {
    return vplRegs.reduce((previousValue, vplReg) => previousValue + this.calculatePrognosis(vplReg), 0);
  }
}
