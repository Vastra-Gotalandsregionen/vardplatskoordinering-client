import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldConfig, Option } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { User } from '../../../domain/User';
import { Administration } from '../../../domain/Administration';
import { forkJoin } from 'rxjs';
import { VplUnit } from '../../../domain/vpl-unit';
import { Management } from '../../../domain/Management';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  fieldConfigs: FieldConfig[] = [];

  dataSource: BasicEditDataSource<User>;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.dataSource = new BasicEditDataSource(http, '/api/user/dto');
  }

  ngOnInit() {
    this.dataSource.load();

    this.dataSource.getSaveEvents().subscribe(_ => this.authService.renewJwt())

    const administrationObservable = this.http.get<Administration[]>('/api/administration');
    const unitObservable = this.http.get<VplUnit[]>('/api/vpl-unit');
    const managementObservable = this.http.get<Management[]>('/api/management');
    // const administrationObservable = this.http.get<Administration[]>('/api/role');

    forkJoin([administrationObservable, unitObservable, managementObservable])
      .subscribe((resultArray) => {
        const allAdministrations = resultArray[0];
        const allUnits = resultArray[1];
        const allManagements = resultArray[2];

        const administrationOptions: Option[] = allAdministrations.map(a => ({label: a.verks, value: a.id}));
        const unitOptions: Option[] = allUnits.map(a => ({label: a.avd, value: a.id}));
        const managementOptions: Option[] = allManagements.map(a => ({label: a.name, value: a.id}));

        const roleOptions: Option[] = [];

        if (this.authService.hasAnyOfRoles(['VPK_MANAGER']) || this.authService.isAdmin()) {
          roleOptions.push({label: 'VPK_MANAGER', value: 'VPK_MANAGER'});
          roleOptions.push({label: 'VPK', value: 'VPK'});
        }

        if (this.authService.hasAnyOfRoles(['VPL_MANAGER']) || this.authService.isAdmin()) {
          roleOptions.push({label: 'VPL_MANAGER', value: 'VPL_MANAGER'});
          roleOptions.push({label: 'VPL', value: 'VPL'});
        }

        if (this.authService.isAdmin()) {
          roleOptions.push({label: 'ADMIN', value: 'ADMIN'});
        }

        this.fieldConfigs = [
          FieldConfig.from('user.username', 'Användarnamn', 'input', null, true, true),
          FieldConfig.from('user.name', 'Namn', 'input', null, true),
          FieldConfig.from('user.management', 'Förvaltning', 'select', managementOptions, true, true),
          FieldConfig.from('administrationIds', 'Områden', 'multiselect', administrationOptions, true),
          FieldConfig.from('unitIds', 'Avdelningar', 'multiselect', unitOptions, true),
          FieldConfig.from('roleIds', 'Roller', 'multiselect', roleOptions, true)
        ];
      });

  }

}
