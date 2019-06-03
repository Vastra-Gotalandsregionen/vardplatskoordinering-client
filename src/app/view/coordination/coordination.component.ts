import { Component, OnInit, ViewChild } from '@angular/core';
import { Registrera } from '../../domain/Registrera';
import { MatDialog, MatTable } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../../domain/PageResponse';
import { Administration } from '../../domain/Administration';
import { combineLatest, forkJoin } from 'rxjs';
import { EditRegistreraDialogComponent } from '../../elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { AkutenTrappa } from '../../domain/AkutenTrappa';
import { EditDecisionDialogComponent } from '../../elements/edit-decision-dialog/edit-decision-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Management } from '../../domain/Management';
import { RegistreraAggregatesDataSource } from '../../service/RegistreraAggregateDataSource';
import { filter, switchMap, tap } from 'rxjs/operators';
import { ViewOnlyImpactDialogComponent } from '../../elements/view-only-impact-dialog/view-only-impact-dialog.component';
import { GlobalStateService } from '../../service/global-state.service';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit {

  todaysRegistreringar: Registrera[] = [];
  administrationer: Administration[];
  management: Management;
  administrationNameMap = {};

  oldDecisionsDataSource: RegistreraAggregatesDataSource;
  todaysDecisionDataSource: RegistreraAggregatesDataSource;

  date: string;
  dayName: string;
  today = new Date().toISOString().slice(0, 10);

  dateObject: Date;

  @ViewChild('oldRegistreraTable')
  table: MatTable<Registrera>;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private globalStateService: GlobalStateService,
              private authService: AuthService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.todaysDecisionDataSource = new RegistreraAggregatesDataSource(this.http, params.date, params.management);
    this.oldDecisionsDataSource = new RegistreraAggregatesDataSource(this.http, null, params.management);

    const paramsObservable = this.route.params;
    const queryParamsObservable = this.route.queryParams;

    combineLatest(paramsObservable, queryParamsObservable)
      .subscribe(result => {
        this.updateView(Number(result[0].management), result[1].date);
      });

  }

  private updateView(managementId: number, date: string) {
    this.globalStateService.setManagementId(managementId);

    if (!date) {
      date = this.today;
    }

    this.date = date;

    this.todaysDecisionDataSource.setDate(date);
    this.todaysDecisionDataSource.load(0);
    this.oldDecisionsDataSource.load(this.oldDecisionsDataSource.currentPage);

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

    const todaysRegistreringarObservable = this.http.get('/api/registrera?management=' + managementId + '&datum=' + date);
    const administrationObservable = this.http.get('/api/administration?management=' + managementId);

    forkJoin(todaysRegistreringarObservable, administrationObservable)
      .subscribe((result: [PageResponse<Registrera[]>, Administration[]]) => {
        this.updateTodaysRegistreringar(result[0].content, result[1]);
      });
  }

  private updateTodaysRegistreringar(todaysRegistreringar: Registrera[], administrationer) {
    this.administrationer = administrationer;
    this.administrationer.forEach(administration => {
      this.administrationNameMap[administration.id] = administration.verks;
    });

    this.todaysRegistreringar = todaysRegistreringar;

    this.administrationer.forEach(administration => {
      const found = todaysRegistreringar.find(registrering => registrering.administration === administration.id);
      if (!found) {
        const registrera = new Registrera();

        registrera.datum = this.date;
        registrera.faststVpl = administration.faststVpl;
        registrera.maltalVardag = administration.maltalVardag;
        registrera.administration = administration.id;

        this.todaysRegistreringar.push(registrera);
      }
    });
  }

  editRegistrera(registrera: Registrera) {
    const dialogRef = this.dialog.open(EditRegistreraDialogComponent, {
      width: '500px',
      panelClass: 'vpk-card-wrapper',
      data: {registrera, administrationName: this.administrationNameMap[registrera.administration]}
    });

    dialogRef.componentInstance.save.pipe(
      filter((result: Registrera) => !!result),
      switchMap((result: Registrera) => this.http.put('/api/registrera', result)),
      switchMap(() => this.http.get('/api/registrera?management=' + this.management.id + '&datum=' + this.date)),
      tap(() => this.updateDecisions())
    ).subscribe((pageResponse: PageResponse<Registrera[]>) => {
      this.updateTodaysRegistreringar(pageResponse.content, this.administrationer);
    });
  }

  editDecision(akutenTrappa: AkutenTrappa) {
    const dialogRef = this.dialog.open(EditDecisionDialogComponent, {
      width: '500px',
      panelClass: 'vpk-card-wrapper',
      data: {akutenTrappa, management: this.management}
    });

    dialogRef.componentInstance.save.subscribe((result: AkutenTrappa) => {
      if (result) {
        this.http.put('/api/akutenTrappa', result).subscribe(() => {
          this.updateDecisions();
        });
      }
    });
  }

  private updateDecisions() {
    this.oldDecisionsDataSource.load(this.oldDecisionsDataSource.currentPage);
    this.todaysDecisionDataSource.load(0);
  }

  editNewDecision() {
    const akutenTrappa = new AkutenTrappa();
    akutenTrappa.management = this.management.id;
    akutenTrappa.datum = this.date;
    this.editDecision(akutenTrappa);
  }

  editDecisionByAkutenTrappaId(akutenTrappaId: number) {
    this.http.get('/api/akutenTrappa/' + akutenTrappaId)
      .subscribe((akutenTrappa: AkutenTrappa) => {
        this.editDecision(akutenTrappa);
      });
  }

  dateSelected(thing, event: any) {
    const d: Date = event.value;
    const dateString = d.toLocaleDateString('se-SE');
    const dateStringIEWorkaround = dateString.replace(/\u200E/g, '');
    this.router.navigate([], {queryParams: {date: dateStringIEWorkaround}});
  }

  openDegreeOfImpactDialog() {
    const dialogRef = this.dialog.open(ViewOnlyImpactDialogComponent, {
      width: '1000px'
    });
  }

  hasDecisionEditPermission() {
    if (this.authService.isAdmin() || this.authService.hasManagementAdminPermission()) {
      return true;
    }
  }
}
