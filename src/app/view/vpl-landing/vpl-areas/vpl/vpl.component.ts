import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../service/auth.service';
import { combineLatest, forkJoin, from, of, Subscription } from 'rxjs';
import { Management } from '../../../../domain/Management';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VplReg } from '../../../../domain/vpl-reg';
import { concatAll, concatMap, map, toArray } from 'rxjs/operators';
import { VplUnit } from '../../../../domain/vpl-unit';
import { Administration } from '../../../../domain/Administration';
import { CalculateUtil } from '../../../../util/calculate-util';

@Component({
  selector: 'app-vpl',
  templateUrl: './vpl.component.html',
  styleUrls: ['./vpl.component.scss']
})
export class VplComponent implements OnInit, OnDestroy {

  isFavorite = false;

  management: Management;
  administration: Administration;

  date: string;
  dayName: string;
  today = new Date().toISOString().slice(0, 10);

  dateObject: Date;

  morningVplRegs: VplReg[] = [];
  noonVplRegs: VplReg[] = [];
  afternoonVplRegs: VplReg[] = [];
  authorizedUnits: VplUnit[];

  constructor(private authService: AuthService,
              private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
  }

  private subscription: Subscription;

  ngOnInit() {

    const pathParams$ = this.route.params;
    const queryParams$ = this.route.queryParams;
    const userLoggedIn$ = this.authService.isUserLoggedIn;

    this.subscription = combineLatest(pathParams$, queryParams$, userLoggedIn$)
      .pipe(
        map(result => forkJoin([
          of(result[0]),
          of(result[1]),
          this.http.get<VplUnit[]>(`/api/vpl-unit?administration=${result[0].administration}`),
          this.http.get<Administration>(`/api/administration/${result[0].administration}`
          )]
        )),
        concatAll()
      )
      .subscribe(result => {
        const pathParams = result[0];
        const queryParams = result[1];
        this.authorizedUnits = result[2].filter(unit => this.authService.authorizedToUnitVpl(unit.id));
        this.administration = result[3];
        this.updateView(pathParams.management, pathParams.administration, queryParams.date, this.authorizedUnits);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private updateView(managementId: number, administration: number, date: string, authorizedUnits: VplUnit[]) {

    if (!date) {
      date = this.today;
    }

    from(['07:00', '11:00', '16:00']).pipe(
      concatMap(tid => this.http.get<VplReg[]>('/api/vpl-reg', {params: {administration: administration.toString(), datum: date, tid}})),
      // concatAll(),
      toArray()
    ).subscribe((vplRegsArray: VplReg[][]) => {
      this.morningVplRegs = vplRegsArray[0];
      this.noonVplRegs = vplRegsArray[1];
      this.afternoonVplRegs = vplRegsArray[2];

      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.morningVplRegs, '07:00', date);
      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.noonVplRegs, '11:00', date);
      this.complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits, this.afternoonVplRegs, '16:00', date);
    });

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

  private complementWithAuthorizedUnitsNotAlreadyInCollection(authorizedUnits: VplUnit[], vplRegs, tid: string, date: string) {
    authorizedUnits.forEach(unit => {
      if (!(vplRegs.map(reg => reg.avdid).indexOf(unit.id) > -1)) {
        const reg = new VplReg();
        reg.avdid = unit.id;
        reg.tid = tid;
        reg.avd = unit.avd;
        reg.fast = unit.fast;
        reg.datum = date;
        reg.defaultMax = unit.antal;
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

  updateAll() {
    this.updateView(this.management.id, this.administration.id, this.date, this.authorizedUnits);
  }

  accumulateField(vplRegs: VplReg[], field: string) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    return vplRegs.reduce((previousValue, currentValue) => previousValue + (currentValue[field] || 0), 0);
  }

  private anyIsPersisted(vplRegs: VplReg[]) {
    return vplRegs.length > 0 && vplRegs.some(vplReg => !!vplReg.id);
  }

  calculatePrognosis(vplRegs: VplReg[]) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    return this.accumulatePrognosis(vplRegs);
  }

  private accumulatePrognosis(vplRegs) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    return vplRegs.reduce((previousValue, currentValue) => previousValue + CalculateUtil.calculatePrognosis(currentValue), 0);
  }

  sumMultipleFields(vplRegs: VplReg[], fields: string[]) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    return CalculateUtil.sumMultipleFields(vplRegs, fields);
  }

  calculateColor(value) {
    if (value === undefined || value === null || value === '-') {
      return 'transparent';
    }

    if (value > 0) {
      return 'green';
    } else if (value === 0) {
      return 'yellow';
    } else if (value < 0) {
      return 'red';
    } else {
      return '';
    }
  }

  calculatePrognosisOb(vplRegs: VplReg[]) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    const negatives = vplRegs
      .map(vplReg => CalculateUtil.calculatePrognosis(vplReg))
      .filter(prognosis => prognosis < 0);

    if (negatives.length > 0) {
      return negatives.reduce((previousValue, currentValue) => previousValue + currentValue);
    } else {
      return '-';
    }
  }

  calculateActualVacants(vplRegs: VplReg[]) {
    if (!this.anyIsPersisted(vplRegs)) {
      return '-';
    }

    return this.accumulateField(vplRegs, 'max') - this.accumulateField(vplRegs, 'inneliggande');
  }
}
