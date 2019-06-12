import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DegreeOfImpact } from '../../domain/DegreeOfImpact';

@Component({
  selector: 'app-view-only-impact-dialog',
  templateUrl: './view-only-impact-dialog.component.html',
  styleUrls: ['./view-only-impact-dialog.component.scss']
})
export class ViewOnlyImpactDialogComponent implements OnInit {

  displayedColumns = ['degree', 'impact', 'details'];
  isLoading = true;
  impactList: DegreeOfImpact[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<DegreeOfImpact[]>('/api/degree-of-impact').subscribe(impactList => {
      this.impactList = impactList;
      this.isLoading = false;
    });
  }
}
