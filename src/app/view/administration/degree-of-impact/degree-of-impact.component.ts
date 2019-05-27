import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { DegreeOfImpact } from '../../../domain/DegreeOfImpact';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-degree-of-impact',
  templateUrl: './degree-of-impact.component.html',
  styleUrls: ['./degree-of-impact.component.scss']
})
export class DegreeOfImpactComponent implements OnInit {

  resourceUrl = '/api/degreeOfImpact';

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('degree', 'Grad', 'input'),
    FieldConfig.from('impact', 'Påverkan', 'input'),
    FieldConfig.from('impactDetails', 'Påverkan detalj', 'ckeditor'),
  ];

  dataSource: BasicEditDataSource<DegreeOfImpact>;

  constructor(http: HttpClient) {
    this.dataSource = new BasicEditDataSource<DegreeOfImpact>(http, this.resourceUrl);
  }

  ngOnInit() {

    this.dataSource.load();
  }

}
