import { Component, OnInit, ViewChild } from '@angular/core';
import { Registrera } from '../../domain/Registrera';
import { MatDialog, MatTable } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../../domain/PageResponse';
import { Administration } from '../../domain/Administration';
import { forkJoin } from 'rxjs';
import { EditRegistreraDialogComponent } from '../../elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { RegistreraAggregate } from '../../domain/RegistreraAggregate';

@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit {

  todaysRegistreringar: Registrera[] = [];
  administrationer: Administration[];
  registreraAggregates: RegistreraAggregate[];

  todayDisplayedColumns = ['verksamhet', 'dispVpl', 'inneliggande', 'fysOtillaten', 'fysTillaten', 'prognosFore',
    'maltalVardag', 'diffVardag', 'action'];

  displayedColumns = ['datum', 'ledigaDisp', 'overbel', 'diff', 'vardplatstrappa'];

  @ViewChild('oldRegistreraTable')
  table: MatTable<Registrera>;

  constructor(private http: HttpClient,
              public dialog: MatDialog) { }

  ngOnInit() {

    const todaysRegistreringarObservable = this.http.get('/api/registrera?datum=' + new Date().toISOString().slice(0, 10));
    const administrationObservable = this.http.get('/api/administration');

    forkJoin(todaysRegistreringarObservable, administrationObservable)
      .subscribe((result: [PageResponse<Registrera[]>, Administration[]]) => {
        this.todaysRegistreringar = result[0].content;
        this.administrationer = result[1];

        this.administrationer.forEach(administration => {
          const found = this.todaysRegistreringar.find(registrering => registrering.verksamhet === administration.verks);
          if (!found) {
            const registrera = new Registrera();

            registrera.datum = new Date().toISOString().slice(0, 10);
            registrera.verksamhet = administration.verks;
            registrera.faststVpl = administration.faststVpl;
            registrera.maltalVardag = administration.maltalVardag;

            this.todaysRegistreringar.push(registrera);
          } else {
            console.log('found');
          }
        });
      });

    this.http.get('/api/registreraAggregate')
      .subscribe((registreraAggregates: RegistreraAggregate[]) => {
        this.registreraAggregates = registreraAggregates;
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
}
