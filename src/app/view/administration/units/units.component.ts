import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { HttpClient } from '@angular/common/http';
import { VplUnit } from '../../../domain/vpl-unit';
import { Administration } from '../../../domain/Administration';
import { concatAll, flatMap, map, toArray } from 'rxjs/operators';
import {BehaviorSubject, forkJoin, of} from 'rxjs';
import { Management } from '../../../domain/Management';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {

  resourceUrl = '/api/vpl-unit';
  isLoading = true;

  fieldsConfigs: FieldConfig[] = [];

  dataSource: BasicEditDataSource<VplUnit>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource<VplUnit>(http, this.resourceUrl);
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
      this.http.get<Administration[]>('/api/administration')
        .subscribe((administrations: Administration[]) => {
          const administrationOptions = administrations.map(a => ({label: a.verks, value: a.id}));

          this.fieldsConfigs = [
            FieldConfig.from('avd', 'Namn', 'input', null, false, true),
            FieldConfig.from('sjh', 'Sjukhus', 'select', [{label: 'NÄL', value: 'NÄL'}, {label: 'US', value: 'US'}], true),
            FieldConfig.from('antal', 'Disponibla', 'input', null, false, true),
            FieldConfig.from('fast', 'Fastställda', 'input', null, false, true),
            FieldConfig.from('medd', 'Förklaring', 'input'),
            FieldConfig.from('administration', 'Område', 'select', administrationOptions, true, true)
          ];
        });
    } );
    // this.updateFieldsConfigByFetchingAdministrationsWithManagement();
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
          FieldConfig.from('name', 'Namn', 'input', null, false, true),
          FieldConfig.from('administration', 'Område', 'select', options1, false, true)
        ];
      });
  }
}
