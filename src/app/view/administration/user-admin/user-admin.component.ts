import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldConfig, Option } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { User } from '../../../domain/User';
import { Administration } from '../../../domain/Administration';
import { forkJoin } from 'rxjs';
import { Unit } from '../../../domain/unit';

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
    // const administrationObservable = this.http.get<Administration[]>('/api/role');

    forkJoin([administrationObservable, unitObservable])
      .subscribe((resultArray) => {
        const allAdministrations = resultArray[0];
        const allUnits = resultArray[1];

        const administrationOptions: Option[] = allAdministrations.map(a => ({label: a.verks, value: a.id}));
        const unitOptions: Option[] = allUnits.map(a => ({label: a.name, value: a.id}));
        const roleOptions: Option[] = ['ADMIN', 'VPK', 'VPL'].map(a => ({label: a, value: a}));

        this.fieldConfigs = [
          FieldConfig.from('user.username', 'Användarnamn', 'input'),
          FieldConfig.from('user.name', 'Namn', 'input'),
          FieldConfig.from('administrationIds', 'Områden', 'multiselect', administrationOptions),
          FieldConfig.from('unitIds', 'Avdelningar', 'multiselect', unitOptions),
          FieldConfig.from('roleIds', 'Roller', 'multiselect', roleOptions)
        ];
      });

  }

}
