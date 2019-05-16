import { Component, Input, OnInit } from '@angular/core';
import { RegistreraAggregate } from '../../domain/RegistreraAggregate';

@Component({
  selector: 'app-decision-table',
  templateUrl: './decision-table.component.html',
  styleUrls: ['./decision-table.component.scss']
})
export class DecisionTableComponent implements OnInit {

  @Input('registreraAggregates') registreraAggregates: RegistreraAggregate[];

  displayedColumns = ['datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa'];

  constructor() { }

  ngOnInit() {
  }

}
