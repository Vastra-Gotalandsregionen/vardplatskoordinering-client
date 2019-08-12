import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { RegistreraAggregatesDataSource } from '../../service/RegistreraAggregateDataSource';
import { filter, tap } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { Registrera } from '../../domain/Registrera';
import { AuthService } from '../../service/auth.service';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-decision-table',
  templateUrl: './decision-table.component.html',
  styleUrls: ['./decision-table.component.scss'],
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
export class DecisionTableComponent implements AfterViewInit, OnInit {

  @Input() dataSource: RegistreraAggregatesDataSource;

  @Output() editDecision = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['toggleExpand', 'datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa', 'action'];

  expandedElement: any;

  constructor(private authService: AuthService,
              private sanitizer: DomSanitizer,
              private breakpointObserver: BreakpointObserver) {

                breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
                  this.displayedColumns = result.matches ?
                      ['toggleExpand', 'datum', 'vardplatstrappa', 'action'] :
                      ['toggleExpand', 'datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa', 'action'];
                });


  }

  ngOnInit() {
    this.dataSource.connect(null).pipe(
      filter(value => value.length === 1)
    ).subscribe((value => this.expandedElement = value[0]));

    this.dataSource.count.subscribe(length => this.paginator.length = length);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => {
          this.dataSource.load(this.paginator.pageIndex);
        })
      )
      .subscribe();
  }

  outputEditDecision(akutenTrappaId: number) {
    this.editDecision.emit(akutenTrappaId);
  }

  getHtml(html: string) {
    if (!html) {
      return ' &mdash;';
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  hasEditPermission(): boolean {
    if (this.authService.isAdmin() || this.authService.hasVpkManagementAdminPermission(this.authService.getManagementId())) {
      return true;
    }
  }
}
