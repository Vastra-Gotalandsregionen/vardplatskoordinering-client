import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../domain/FieldConfig';
import { BasicEditDataSource } from '../../../service/BasicEditDataSource';
import { Link } from '../../../domain/link';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {

  resourceUrl = '/api/link';
  isLoading = true;

  fieldConfigs: FieldConfig[] = [
    FieldConfig.from('label', 'Namn', 'input', null, false, true),
    FieldConfig.from('url', 'URL', 'input', null, false, true)
  ];

  dataSource: BasicEditDataSource<Link>;

  constructor(http: HttpClient) {
    this.dataSource = new BasicEditDataSource<Link>(http, this.resourceUrl);
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
