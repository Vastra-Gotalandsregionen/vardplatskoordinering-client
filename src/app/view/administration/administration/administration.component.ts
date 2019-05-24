import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { Administration } from '../../../domain/Administration';
import { HttpClient } from '@angular/common/http';
import { Management } from '../../../domain/Management';

@Component({
  selector: 'app-areas',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  fieldConfigs: FieldConfig[] = [];

  dataSource: BasicEditDataSource<Administration>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource<Administration>(http, '/api/administration');
  }

  ngOnInit() {
    this.dataSource.load();
    this.http.get('/api/management').subscribe((managements: Management[]) => {

      this.fieldConfigs = [
        FieldConfig.from('verks', 'Namn', 'input'),
        FieldConfig.from('faststVpl', 'Fastställda vårdplatser', 'input'),
        FieldConfig.from('maltalVardag', 'Måltal vardag', 'input'),
        FieldConfig.from('maltalHelg', 'Måltal helg', 'input'),
        FieldConfig.from('maltalStorhelg', 'Måltal storhelg', 'input'),
        FieldConfig.from('management', 'Förvaltning', 'select', managements.map(m => ({label: m.name, value: m.id}))),
      ];
    });
  }

}
