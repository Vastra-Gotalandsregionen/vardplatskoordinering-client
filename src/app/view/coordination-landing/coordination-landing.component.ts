import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Management } from '../../domain/Management';
import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'app-coordination-landing',
  templateUrl: './coordination-landing.component.html',
  styleUrls: ['./coordination-landing.component.scss']
})
export class CoordinationLandingComponent implements OnInit {

  managements: Management[];
  navItems: NavItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/management')
      .subscribe((managements: Management[]) => {
        this.managements = managements;

        for(let management of managements) {
          let navItem = new NavItem(management.name, 'Välj', management.id.toString(), '', 'arrow-right');
          this.navItems.push(navItem);
        }

      });
  }

}
