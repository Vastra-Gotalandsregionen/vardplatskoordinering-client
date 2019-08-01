import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { HttpClient } from '@angular/common/http';
import { VplRum } from '../../../domain/vpl-rum';

@Component({
  selector: 'app-vpl-administration',
  templateUrl: './vpl-administration.component.html',
  styleUrls: ['./vpl-administration.component.scss']
})
export class VplAdministrationComponent implements OnInit {

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('rum', 'Rums namn', 'input', null, false, true)
  ];

  dataSource: BasicEditDataSource<VplRum>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource(http, '/api/vplRum');
  }

  ngOnInit() {
    this.dataSource.load();
  }

}
