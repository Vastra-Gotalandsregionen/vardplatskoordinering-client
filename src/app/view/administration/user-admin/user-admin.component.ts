import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { User } from '../../../domain/User';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {
  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('username', 'input'),
    FieldConfig.from('name', 'input')
  ];

  dataSource: BasicEditDataSource<User>;

  constructor(private http: HttpClient) {
    this.dataSource = new BasicEditDataSource(http, '/api/user');
  }

  ngOnInit() {
    this.dataSource.load();
  }

}
