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
import { ActivatedRoute } from '@angular/router';
import { Management } from '../../domain/Management';
import { RegistreraAggregatesDataSource } from '../../service/RegistreraAggregateDataSource';

@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit {

  todaysRegistreringar: Registrera[] = [];
  administrationer: Administration[];
  management: Management;

  oldDecisionsDataSource: RegistreraAggregatesDataSource;
  todaysDecisionDataSource: RegistreraAggregatesDataSource;

  date: string;
  dayName: string;
  today = new Date().toISOString().slice(0, 10);

  todayDisplayedColumns = ['verksamhet', 'dispVpl', 'inneliggande', 'fysOtillaten', 'fysTillaten', 'prognosFore',
    'maltalVardag', 'diffVardag', 'action'];

  @ViewChild('oldRegistreraTable')
  table: MatTable<Registrera>;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
    this.oldDecisionsDataSource = new RegistreraAggregatesDataSource(this.http, null);
  }

  ngOnInit() {
    const paramsObservable = this.route.params;
    const queryParamsObservable = this.route.queryParams;

    combineLatest(paramsObservable, queryParamsObservable)
      .subscribe(result => {
        this.updateView(result[0].management, result[1].date);
      });

  }

  private updateView(managementId: number, date: string) {
    if (!date) {
      date = this.today;
    }

    this.date = date;

    this.todaysDecisionDataSource = new RegistreraAggregatesDataSource(this.http, date);
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
        this.todaysRegistreringar = result[0].content;
        this.administrationer = result[1];

        this.administrationer.forEach(administration => {
          const found = this.todaysRegistreringar.find(registrering => registrering.verksamhet === administration.verks);
          if (!found) {
            const registrera = new Registrera();

            registrera.datum = this.today;
            registrera.verksamhet = administration.verks;
            registrera.faststVpl = administration.faststVpl;
            registrera.maltalVardag = administration.maltalVardag;

            this.todaysRegistreringar.push(registrera);
          }
        });
      });
  }

  editRegistrera(registrera: Registrera) {
    const dialogRef = this.dialog.open(EditRegistreraDialogComponent, {
      width: '500px',
      data: {registrera}
    });

    dialogRef.componentInstance.save.subscribe((result: Registrera) => {
      if (result) {
        this.http.put('/api/registrera', result).subscribe(() => this.ngOnInit());
      }
    });
  }

  editDecision(akutenTrappa: AkutenTrappa) {
    const dialogRef = this.dialog.open(EditDecisionDialogComponent, {
      width: '500px',
      data: {akutenTrappa}
    });

    dialogRef.componentInstance.save.subscribe((result: AkutenTrappa) => {
      if (result) {
        this.http.put('/api/akutenTrappa', result).subscribe(() => {
          this.oldDecisionsDataSource.load(this.oldDecisionsDataSource.currentPage);
          this.todaysDecisionDataSource.load(0);
        });
      }
    });
  }

  editNewDecision() {
    const akutenTrappa = new AkutenTrappa();
    akutenTrappa.datum = new Date().toISOString().slice(0, 10);
    this.editDecision(akutenTrappa);
  }

  editDecisionByAkutenTrappaId(akutenTrappaId: number) {
    this.http.get('/api/akutenTrappa/' + akutenTrappaId)
      .subscribe((akutenTrappa: AkutenTrappa) => {
        this.editDecision(akutenTrappa);
      });
  }
}
