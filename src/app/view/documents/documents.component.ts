import { Component, OnInit } from '@angular/core';

import { NavItem } from '../../domain/NavItem';
import { HttpClient } from '@angular/common/http';
import { Link } from '../../domain/link';
import { flatMap, map, toArray } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  vpkLinks: NavItem[] = [];
  vplLinks: NavItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.populate('/api/link', (navItems) => this.vpkLinks = navItems);
    this.populate('/api/vpl-link', (navItems) => this.vplLinks = navItems);
  }

  private populate(url: string, callback: (navitems: NavItem[]) => void) {
    this.http.get<Link[]>(url)
      .pipe(
        flatMap(links => of(...links)),
        map(link => new NavItem(link.label, '', '', link.url, 'link', '_blank')),
        toArray()
      )
      .subscribe(navitems => callback(navitems));
  }

}
