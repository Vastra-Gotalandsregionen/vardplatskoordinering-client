import { Component, OnInit } from '@angular/core';
import { Management } from '../../domain/Management';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss']
})
export class ManagementsComponent implements OnInit {

  managements: Management[] = [];
  displayedColumns: string[] = ['management', 'action'];
  dataSource = new MatTableDataSource<Management>();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    debugger;
    console.log('management');
    this.http.get<Management[]>('/api/management/').subscribe((managements) => { this.dataSource.data = managements;
                                                                                 console.log(this.dataSource.data);
      }
      );
  }

}
