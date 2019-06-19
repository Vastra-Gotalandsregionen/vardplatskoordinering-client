import { Component, OnInit } from '@angular/core';
import { Management } from '../../domain/Management';
import { NavItem } from '../../domain/NavItem';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vpl-landing',
  templateUrl: './vpl-landing.component.html',
  styleUrls: ['./vpl-landing.component.scss']
})
export class VplLandingComponent implements OnInit {

  managements: Management[];
  navItems: NavItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/api/management')
      .subscribe((managements: Management[]) => {
        this.managements = managements;

        for (const management of managements) {
          const navItem = new NavItem(management.name, 'Välj', management.id.toString(), '', 'arrow-right', '');
          this.navItems.push(navItem);
        }
      });
  }
}
