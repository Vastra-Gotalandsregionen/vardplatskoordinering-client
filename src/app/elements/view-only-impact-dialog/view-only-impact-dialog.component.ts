import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DegreeOfImpact } from '../../domain/DegreeOfImpact';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-only-impact-dialog',
  templateUrl: './view-only-impact-dialog.component.html',
  styleUrls: ['./view-only-impact-dialog.component.scss']
})
export class ViewOnlyImpactDialogComponent implements OnInit {

  displayedColumns = ['degree', 'impact', 'details'];
  isLoading: boolean = true;
  impactList: DegreeOfImpact[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<DegreeOfImpact[]>('api/degreeOfImpact').subscribe(impactList => {
      this.impactList = impactList;
      this.isLoading = false;
    });
  }
}
