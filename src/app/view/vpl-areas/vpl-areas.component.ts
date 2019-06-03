import { Component, OnInit } from '@angular/core';
import { Management } from '../../domain/Management';
import { combineLatest} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

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

  dateObject: Date;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;

    const paramsObservable = this.route.params;
    const queryParamsObservable = this.route.queryParams;
    combineLatest(paramsObservable, queryParamsObservable)
      .subscribe(result => {
        this.updateView(Number(result[0].management), result[1].date);
      });

  }

  private updateView(managementId: number, date: string) {

    if (!date) {
      date = this.today;
    }

    this.date = date;

    let month = date.slice(5, 7);

    if (month.indexOf('0') === 0) {
      month = month.slice(1, 2);
    }

    // tslint:disable-next-line:radix
    const date1 = new Date(Number.parseInt(date.slice(0, 4)), Number.parseInt(month) - 1, Number.parseInt(date.slice(8, 10)));
    const days = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
    this.dayName = days[date1.getDay()];

    this.http.get<Management>('/api/management/' + managementId)
      .subscribe(management => this.management = management);
  }
}
