import { Component, OnInit } from '@angular/core';
import { Definition } from '../../../domain/Definition';
import { HttpClient } from '@angular/common/http';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';

@Component({
  selector: 'app-definitions-admin',
  templateUrl: './definitions-admin.component.html',
  styleUrls: ['./definitions-admin.component.scss']
})
export class DefinitionsAdminComponent implements OnInit {

  resourceUrl = '/api/definition';

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('definition', 'Namn', 'input'),
    FieldConfig.from('beskrivning', 'Beskrivning', 'ckeditor'),
    FieldConfig.from('lista', 'Publik', 'input')
  ];

  dataSource: BasicEditDataSource<Definition>;

  constructor(http: HttpClient) {
    this.dataSource = new BasicEditDataSource<Definition>(http, this.resourceUrl);
  }

  ngOnInit() {
    this.dataSource.load();
  }

}

