import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Management } from '../../domain/Management';

@Component({
  selector: 'app-coordination-landing',
  templateUrl: './coordination-landing.component.html',
  styleUrls: ['./coordination-landing.component.scss']
})
export class CoordinationLandingComponent implements OnInit {

  managements: Management[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/management')
      .subscribe((managements: Management[]) => {
        this.managements = managements;
      });
  }

}
