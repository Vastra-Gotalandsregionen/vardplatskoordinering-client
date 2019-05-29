import { Component, OnInit } from '@angular/core';
import { Management } from '../../domain/Management';
import { RegistreraAggregatesDataSource } from "../../service/RegistreraAggregateDataSource";
import { combineLatest } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-vpl-areas',
  templateUrl: './vpl-areas.component.html',
  styleUrls: ['./vpl-areas.component.scss']
})
export class VplAreasComponent implements OnInit {

  management: Management;
  date: string;
  dayName: string;
  today = new Date().toISOString().slice(0, 10);
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    const params = this.route.snapshot.params;
    const paramsObservable = this.route.params;
    const queryParamsObservable = this.route.queryParams;

    combineLatest(paramsObservable, queryParamsObservable)
      .subscribe(result => {
        this.http.get<Management>('/api/management/' + result[0].management)
          .subscribe(management => this.management = management);
        this.date = result[1].date;
      });

  }

}
