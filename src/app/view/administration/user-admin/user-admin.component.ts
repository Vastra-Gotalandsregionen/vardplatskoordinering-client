import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldConfig, Option } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { User } from '../../../domain/User';
import { Administration } from '../../../domain/Administration';
import { forkJoin } from 'rxjs';
import { Unit } from '../../../domain/unit';
import { Management } from '../../../domain/Management';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  fieldConfigs: FieldConfig[] = [];

  dataSource: BasicEditDataSource<User>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource(http, '/api/user/dto');
  }

  ngOnInit() {
    this.dataSource.load();

    const administrationObservable = this.http.get<Administration[]>('/api/administration');
    const unitObservable = this.http.get<Unit[]>('/api/unit');
    const managementObservable = this.http.get<Management[]>('/api/management');
    // const administrationObservable = this.http.get<Administration[]>('/api/role');

    forkJoin([administrationObservable, unitObservable, managementObservable])
      .subscribe((resultArray) => {
        const allAdministrations = resultArray[0];
        const allUnits = resultArray[1];
        const allManagements = resultArray[2];

        const administrationOptions: Option[] = allAdministrations.map(a => ({label: a.verks, value: a.id}));
        const unitOptions: Option[] = allUnits.map(a => ({label: a.name, value: a.id}));
        const roleOptions: Option[] = ['ADMIN', 'VPK', 'VPL', 'MANAGEMENT_ADMIN'].map(a => ({label: a, value: a}));
        const managementOptions: Option[] = allManagements.map(a => ({label: a.name, value: a.id}));

        this.fieldConfigs = [
          FieldConfig.from('user.username', 'Användarnamn', 'input', null, true),
          FieldConfig.from('user.name', 'Namn', 'input', null, true),
          FieldConfig.from('user.management', 'Förvaltning', 'select', managementOptions, true),
          FieldConfig.from('administrationIds', 'Områden', 'multiselect', administrationOptions, true),
          FieldConfig.from('unitIds', 'Avdelningar', 'multiselect', unitOptions, true),
          FieldConfig.from('roleIds', 'Roller', 'multiselect', roleOptions, true)
        ];
      });

  }

}
