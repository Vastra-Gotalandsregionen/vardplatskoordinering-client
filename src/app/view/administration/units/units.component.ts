import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../../domain/unit';
import { Administration } from '../../../domain/Administration';
import { flatMap, map, toArray } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { Management } from '../../../domain/Management';
import { Tuple2 } from '../../../domain/tuple2';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  resourceUrl = '/api/unit';

  fieldsConfigs: FieldConfig[] = [];

  dataSource: BasicEditDataSource<Unit>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource<Unit>(http, this.resourceUrl);
  }

  ngOnInit() {
    this.dataSource.load();

    this.updateFieldsConfigByFetchingWithADbJoin();

    // this.updateFieldsConfigByFetchingAdministrationsWithManagement();
  }

  private updateFieldsConfigByFetchingWithADbJoin() {
    this.http.get<Tuple2<Administration, Management>[]>('/api/administration/joinManagement')
      .subscribe((tuples2: Tuple2<Administration, Management>[]) => {
        this.fieldsConfigs = [
          FieldConfig.from('name', 'input'),
          FieldConfig.from('administration', 'select',
            tuples2.map(tuple2 => ({label: tuple2.v2.name + ' > ' + tuple2.v1.verks, value: tuple2.v1.id})))
        ];
      });
  }

  // A fancy way of using RxJs to do the same thing that could be done with a db join
  private updateFieldsConfigByFetchingAdministrationsWithManagement() {
    this.http.get<Administration[]>('/api/administration')
      .pipe(
        flatMap((administrations: Administration[]) => of(...administrations)),
        map((administration: Administration) => forkJoin([
          this.http.get<Management>('/api/management/' + administration.management).pipe(map(m => m.name)),
          of(administration)
        ])),
        flatMap(value => value),
        toArray()
      )
      .subscribe((administrationNameManagementNamePairArray) => {
        const options1 = administrationNameManagementNamePairArray.map(e => ({
          label: e[0] + ' > ' + e[1].verks,
          value: e[1].id
        }));

        this.fieldsConfigs = [
          FieldConfig.from('name', 'input'),
          FieldConfig.from('administration', 'select', options1)
        ];
      });
  }
}
