import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { combineLatest, forkJoin, from, of } from 'rxjs';
import { Management } from '../../../../domain/Management';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material';
import { VplReg } from '../../../../domain/vpl-reg';
import { concatAll, concatMap, map, toArray } from 'rxjs/operators';
import { VplUnit } from '../../../../domain/vpl-unit';

@Component({
  selector: 'app-vpl',
  templateUrl: './vpl.component.html',
  styleUrls: ['./vpl.component.scss']
})
export class VplComponent implements OnInit {

  isFavorite: boolean = false;
  management: Management;
  date: string;
  dayName: string;
  today = new Date().toISOString().slice(0, 10);

  dateObject: Date;

  morningVplRegs: VplReg[] = [];
  noonVplRegs: VplReg[] = [];
  afternoonVplRegs: VplReg[] = [];


  constructor(private authService: AuthService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const pathParams$ = this.route.params;
    const queryParams$ = this.route.queryParams;
    const userLoggedIn$ = this.authService.isUserLoggedIn;

    combineLatest(pathParams$, queryParams$, userLoggedIn$)
      .pipe(
        map(result => forkJoin([
          of(result[0]),
          of(result[1]),
          this.http.get<VplUnit[]>(`/api/vplUnit?administration=${result[0].administration}`)])),
        concatAll()
        /*concatMap(r => {
          debugger;
          return of([r[0], r[1], this.http.get('/api/unit')]);
        }),*/
        // toArray()
        // concatAll(),
        /*concat(result => {
          debugger;
          return [];
        }),*/
        /*combineAll(result => {
          debugger;
          return of(...[result[0], result[1]]);
        }),*/
        // concatAll(),
        // toArray()
      )
      .subscribe(result => {
        const pathParams = result[0];
        const queryParams = result[1];
        const authorizedUnits = result[2].filter(unit => this.authService.authorizedToUnit(unit.id));
        this.updateView(pathParams.management, pathParams.administration, queryParams.date, authorizedUnits);
      });

  }

  private updateView(managementId: string, administration: string, date: string, authorizedUnits: VplUnit[]) {

    if (!date) {
      date = this.today;
    }

    from(['07:00', '11:00', '16:00']).pipe(
      concatMap(tid => this.http.get<VplReg[]>('/api/vplReg', {params: {administration, datum: date, tid}})),
      // concatAll(),
      toArray()
    ).subscribe((vplRegsArray: VplReg[][]) => {
      this.morningVplRegs = vplRegsArray[0];
      this.noonVplRegs = vplRegsArray[1];
      this.afternoonVplRegs = vplRegsArray[2];

      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.morningVplRegs, '07:00');
      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.noonVplRegs, '11:00');
      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.afternoonVplRegs, '16:00');
    });

/*    this.http.get<VplReg[]>('/api/vplReg', {params: {administration, datum: date, tid: '07:00'}})
      .subscribe(vplRegs => {
        this.morningVplRegs = vplRegs;
      });*/

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

  private complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits: VplUnit[], vplRegs, tid: string) {
    authorizedUnits.forEach(unit => {
      if (!vplRegs.map(reg => reg.avdid).includes(unit.id)) {
        const reg = new VplReg();
        reg.avdid = unit.id;
        reg.tid = tid;
        reg.avd = unit.avd;
        reg.fast = unit.fast;
        reg.datum = this.today;
        vplRegs.push(reg);
      }
    });
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  toggleFavorite() {
    // Implement actual logic to toggle favorite
    this.isFavorite = !this.isFavorite;
  }

  dateSelected(change: string, event: MatDatepickerInputEvent<any>) {
    const d: Date = event.value;
    const dateString = d.toLocaleDateString('sv-SE');
    const dateStringIEWorkaround = dateString.replace(/\u200E/g, '');
    this.router.navigate([], {queryParams: {date: dateStringIEWorkaround}});
  }
}
