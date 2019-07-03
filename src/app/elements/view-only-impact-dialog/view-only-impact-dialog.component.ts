import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DegreeOfImpact } from '../../domain/DegreeOfImpact';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-view-only-impact-dialog',
  templateUrl: './view-only-impact-dialog.component.html',
  styleUrls: ['./view-only-impact-dialog.component.scss'],
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
export class ViewOnlyImpactDialogComponent implements OnInit {

  displayedColumns = ['degree', 'impact', 'details'];
  isLoading = true;
  impactList: DegreeOfImpact[] = [];
  expandedElement: any;

  constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 600px)']).subscribe(result => {
                  
      this.displayedColumns = result.matches ? 
        ['toggleExpand', 'degree', 'impact'] : 
        ['degree', 'impact', 'details'];
    });
  }

  ngOnInit() {
    this.http.get<DegreeOfImpact[]>('/api/degree-of-impact').subscribe(impactList => {
      this.impactList = impactList;
      this.isLoading = false;
    });
  }
}
