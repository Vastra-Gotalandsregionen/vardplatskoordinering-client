import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { RegistreraAggregatesDataSource } from '../../service/RegistreraAggregateDataSource';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-decision-table',
  templateUrl: './decision-table.component.html',
  styleUrls: ['./decision-table.component.scss']
})
export class DecisionTableComponent implements AfterViewInit, OnInit {

  @Input() dataSource: RegistreraAggregatesDataSource;

  @Output() editDecision = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa', 'action'];

  constructor() { }

  ngOnInit() {
    this.dataSource.load(0);
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
}
