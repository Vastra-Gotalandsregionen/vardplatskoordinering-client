import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { HttpClient } from '@angular/common/http';
import { VplLink } from '../../../domain/vpl-link';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-vpl-links',
  templateUrl: './vpl-links.component.html',
  styleUrls: ['./vpl-links.component.scss']
})
export class VplLinksComponent implements OnInit {

  resourceUrl = '/api/vpl-link';
  isLoading = true;

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('label', 'Namn', 'input', null, false, true),
    FieldConfig.from('url', 'URL', 'input', null, false, true)
  ];

  dataSource: BasicEditDataSource<VplLink>;

  constructor(http: HttpClient) {
    this.dataSource = new BasicEditDataSource<VplLink>(http, this.resourceUrl);
  }

  ngOnInit() {
    const userLoadingSubject = new BehaviorSubject(null);
    const subscription = this.dataSource.load();

    subscription.add(teardown => {
      userLoadingSubject.next(1);
      userLoadingSubject.complete();
    });
    userLoadingSubject
      .finally(() => {
        this.isLoading = false;
      }).subscribe();
  }

}
