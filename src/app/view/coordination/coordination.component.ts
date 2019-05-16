import { Component, OnInit, ViewChild } from '@angular/core';
import { Registrera } from '../../domain/Registrera';
import { MatDialog, MatTable } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../../domain/PageResponse';
import { Administration } from '../../domain/Administration';
import { forkJoin } from 'rxjs';
import { EditRegistreraDialogComponent } from '../../elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { RegistreraAggregate } from '../../domain/RegistreraAggregate';
import { AkutenTrappa } from '../../domain/AkutenTrappa';
import { EditDecisionDialogComponent } from '../../elements/edit-decision-dialog/edit-decision-dialog.component';

@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit {

  todaysRegistreringar: Registrera[] = [];
  administrationer: Administration[];
  registreraAggregates: RegistreraAggregate[];
  todaysDecision: RegistreraAggregate[];

  todayDisplayedColumns = ['verksamhet', 'dispVpl', 'inneliggande', 'fysOtillaten', 'fysTillaten', 'prognosFore',
    'maltalVardag', 'diffVardag', 'action'];

  @ViewChild('oldRegistreraTable')
  table: MatTable<Registrera>;

  constructor(private http: HttpClient,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    const today = new Date().toISOString().slice(0, 10);
    const todaysRegistreringarObservable = this.http.get('/api/registrera?datum=' + today);
    const administrationObservable = this.http.get('/api/administration');

    forkJoin(todaysRegistreringarObservable, administrationObservable)
      .subscribe((result: [PageResponse<Registrera[]>, Administration[]]) => {
        this.todaysRegistreringar = result[0].content;
        this.administrationer = result[1];

        this.administrationer.forEach(administration => {
          const found = this.todaysRegistreringar.find(registrering => registrering.verksamhet === administration.verks);
          if (!found) {
            const registrera = new Registrera();

            registrera.datum = today;
            registrera.verksamhet = administration.verks;
            registrera.faststVpl = administration.faststVpl;
            registrera.maltalVardag = administration.maltalVardag;

            this.todaysRegistreringar.push(registrera);
          }
        });
      });

    this.http.get('/api/registreraAggregate')
      .subscribe((registreraAggregates: RegistreraAggregate[]) => {
        this.registreraAggregates = registreraAggregates;

        if (registreraAggregates[0].datum === today) {
          this.todaysDecision = registreraAggregates.slice(0, 1);
        }
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
        this.http.put('/api/akutenTrappa', result).subscribe(() => this.ngOnInit());
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
