import { Component, OnInit } from '@angular/core';
import { Management } from '../../../domain/Management';
import { HttpClient } from '@angular/common/http';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';

@Component({
  selector: 'app-managements',
  templateUrl: './managements.component.html',
  styleUrls: ['./managements.component.scss']
})
export class ManagementsComponent implements OnInit {

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('name', 'Namn', 'input', null, false, true),
    FieldConfig.from('morning', 'Morgon', 'select', [{label: 'Ja', value: true}, {label: 'Nej', value: false}], false),
    FieldConfig.from('noon', 'Förmiddag', 'select', [{label: 'Ja', value: true}, {label: 'Nej', value: false}], false),
    FieldConfig.from('afternoon', 'Eftermiddag', 'select', [{label: 'Ja', value: true}, {label: 'Nej', value: false}], false)
  ];

  dataSource: BasicEditDataSource<Management>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource(http, '/api/management');
  }

  ngOnInit() {
    this.dataSource.load();
  }

}
