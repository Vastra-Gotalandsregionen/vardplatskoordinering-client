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

  resourceUrl = '/api/degree-of-impact';

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('degree', 'Grad', 'input', null, false, true),
    FieldConfig.from('impact', 'Påverkan', 'input', null, false, true),
    FieldConfig.from('impactDetails', 'Påverkan detalj', 'ckeditor', null, false, true),
  ];

  dataSource: BasicEditDataSource<DegreeOfImpact>;

  constructor(http: HttpClient) {
    this.dataSource = new BasicEditDataSource<DegreeOfImpact>(http, this.resourceUrl);
  }

  ngOnInit() {

    this.dataSource.load();
  }

}
