import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistreraAggregate } from '../../domain/RegistreraAggregate';

@Component({
  selector: 'app-decision-table',
  templateUrl: './decision-table.component.html',
  styleUrls: ['./decision-table.component.scss']
})
export class DecisionTableComponent implements OnInit {

  @Input() registreraAggregates: RegistreraAggregate[];

  @Output() editDecision = new EventEmitter<number>();

  displayedColumns = ['datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa', 'action'];

  constructor() { }

  ngOnInit() {
  }

  outputEditDecision(akutenTrappaId: number) {
    this.editDecision.emit(akutenTrappaId);
  }
}
