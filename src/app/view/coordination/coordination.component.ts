import { Component, OnInit, ViewChild } from '@angular/core';
import { Registrera } from '../../domain/Registrera';
import { MatTable } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { PageResponse } from '../../domain/PageResponse';

@Component({
  selector: 'app-coordination',
  templateUrl: './coordination.component.html',
  styleUrls: ['./coordination.component.scss']
})
export class CoordinationComponent implements OnInit {
  registreringar: Registrera[] = [];
  todaysRegistreringar: Registrera[] = [];
  displayedColumns = ['verksamhet', 'datum', 'veckodag'];

  @ViewChild('oldRegistreraTable')
  table: MatTable<Registrera>;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    /*const registrera1 = new Registrera();
    registrera1.datum = '2019-05-13';
    registrera1.veckodag = 'måndag';
    const registrera2 = new Registrera();
    registrera2.datum = '2019-05-12';
    registrera2.veckodag = 'söndag';
    this.registreringar = [registrera1, registrera2];*/

    this.http.get('/api/registrera?datum=' + new Date().toISOString().slice(0, 10))
      .subscribe((pageResponse: PageResponse<Registrera[]>) => {
        this.registreringar = pageResponse.content;
      });

    this.http.get('/api/registrera')
      .subscribe((pageResponse: PageResponse<Registrera[]>) => {
        this.registreringar = pageResponse.content;
      });

    // debugger;
    // console.log(this.table);
    // this.table.dataSource = this.registreringar;
    // this.table.renderRows();
  }

}
