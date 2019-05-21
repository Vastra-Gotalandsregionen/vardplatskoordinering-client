import { Component, OnInit } from '@angular/core';
import { Management } from '../../domain/Management';
import { HttpClient } from '@angular/common/http';
import { FieldConfig } from '../../domain/FieldConfig';
import { BasicEditDataSource } from '../../service/BasicEditDataSource';

@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss']
})
export class ManagementsComponent implements OnInit {

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('name', 'input')
  ];

  dataSource: BasicEditDataSource<Management>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource(http, '/api/management');
  }

  ngOnInit() {
    this.dataSource.load();
  }

}
