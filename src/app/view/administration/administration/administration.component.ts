import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { Administration } from '../../../domain/Administration';
import { HttpClient } from '@angular/common/http';
import { Management } from '../../../domain/Management';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-areas',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  fieldConfigs: FieldConfig[] = [];
  isLoading = true;

  dataSource: BasicEditDataSource<Administration>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource<Administration>(http, '/api/administration');
  }

  ngOnInit() {
    const userLoadingSubject = new BehaviorSubject(null);
    const subscription = this.dataSource.load();

    subscription.add(teardown => {
      userLoadingSubject.next(1);
      userLoadingSubject.complete();
    });
    userLoadingSubject.finally(() => {
      this.isLoading = false;
    }).subscribe(() => {
      this.http.get('/api/management').subscribe((managements: Management[]) => {

        this.fieldConfigs = [
          FieldConfig.from('verks', 'Namn', 'input', null, true, true),
          FieldConfig.from('faststVpl', 'Fastställda vårdplatser', 'input', null, null, true),
          FieldConfig.from('maltalVardag', 'Måltal vardag', 'input', null, null, true),
          FieldConfig.from('maltalHelg', 'Måltal helg', 'input'),
          FieldConfig.from('maltalStorhelg', 'Måltal storhelg', 'input'),
          FieldConfig.from('management', 'Förvaltning', 'select', managements.map(m => ({label: m.name, value: m.id})), true, true),
        ];
      });
    });
  }
}
