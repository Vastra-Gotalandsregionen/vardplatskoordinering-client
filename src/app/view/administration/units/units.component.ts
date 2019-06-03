import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../../../domain/unit';
import { Administration } from '../../../domain/Administration';
import { concatAll, flatMap, map, toArray } from 'rxjs/operators';
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
    this.http.get<Administration[]>('/api/administration')
      .subscribe((administrations: Administration[]) => {
        const administrationOptions = administrations.map(a => ({label: a.verks, value: a.id}));

        this.fieldsConfigs = [
          FieldConfig.from('name', 'Namn', 'input'),
          FieldConfig.from('administration', 'Område', 'select', administrationOptions)
        ];
      });
  }

  // A fancy way of using RxJs to do the same thing that could be done with a db join
  private updateFieldsConfigByFetchingAdministrationsWithManagement() {
    this.http.get<Administration[]>('/api/administration')
      .pipe(
        flatMap((administrations: Administration[]) => of(...administrations)), // Emit a stream of administrations instead of single array.
        map((administration: Administration) => forkJoin([
          this.http.get<Management>('/api/management/' + administration.management).pipe(map(m => m.name)),
          of(administration)
        ])), // forkJoin to make one observable out of two observables - one for management and one for administration
        concatAll(), // Flatten the stream of observables to first-order values. The output is arrays with management and administration.
        // flatMap(value => value),
        toArray() // Make the stream into an array of the two-length arrays.
      )
      .subscribe((administrationNameManagementNamePairArray) => {
        const options1 = administrationNameManagementNamePairArray.map(e => ({
          label: e[0] + ' > ' + e[1].verks,
          value: e[1].id
        }));

        this.fieldsConfigs = [
          FieldConfig.from('name', 'Namn', 'input'),
          FieldConfig.from('administration', 'Område', 'select', options1)
        ];
      });
  }
}
