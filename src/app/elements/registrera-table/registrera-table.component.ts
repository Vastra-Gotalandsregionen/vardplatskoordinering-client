import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Registrera } from '../../domain/Registrera';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-registrera-table',
  templateUrl: './registrera-table.component.html',
  styleUrls: ['./registrera-table.component.scss'],
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
export class RegistreraTableComponent implements OnInit {

  @Input() registreringar: Registrera[];

  @Output() editRegistrera = new EventEmitter<Registrera>();


  todayDisplayedColumns = ['toggleExpand', 'verksamhet', 'dispVpl', 'inneliggande', 'fysOtillaten', 'fysTillaten', 'prognosFore',
    'maltalVardag', 'diffVardag', 'pg', 'action'];

  expandedElements: number[] = [];
  allExpanded = false;

  constructor(private authService: AuthService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  emitEitRegistrera(registrera: Registrera) {
    this.editRegistrera.emit(registrera);
  }

  sum(registreringar: Registrera[], property: string) {
    return registreringar
      .map(r => r[property])
      .filter(value => !!value)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
  }

  toggleRow(registrera: Registrera) {
    const indexOf = this.expandedElements.indexOf(registrera.id);

    if (indexOf > -1) {
      this.expandedElements.splice(indexOf, 1);
    } else {
      this.expandedElements.push(registrera.id);
    }
  }

  getHtml(html: string) {
    if (!html) {
      return '–';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleAllExpanded() {
    this.allExpanded = !this.allExpanded;

    this.expandedElements = this.allExpanded ? this.registreringar.map(r => r.id) : [];
  }

  average(registreringar: Registrera[], property: string) {
    const length = registreringar.map(r => r[property]).filter(v => !!v).length;

    if (length === 0) {
      return 0;
    }

    return this.sum(registreringar, property) / length;
  }

  hasEditPermission(registrera: Registrera): boolean {
    if (this.authService.isAdmin() || this.authService.hasManagementAdminPermission()) {
      return true;
    }

    const today = new Date().toISOString().slice(0, 10);
    return this.authService.hasAdministrationEditPermission(registrera.administration) && registrera.datum === today;
  }
}