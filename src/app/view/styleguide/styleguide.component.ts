import { Component, OnInit, ViewChild } from '@angular/core';

import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'app-styleguide',
  templateUrl: './styleguide.component.html',
  styleUrls: ['./styleguide.component.scss']
})
export class StyleguideComponent implements OnInit {

  navItems: NavItem[] = [];

  constructor() { }

  ngOnInit() {
    this.navItems = this.getNavItems();
  }

  getNavItems(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Hem', '/hem', '', 'Välj');
    let navItem2 = new NavItem('Koordinering', '/koordinering', '', 'Välj');
    let navItem3 = new NavItem('Administration', '/administration', '', 'Välj');
    let navItem4 = new NavItem('Google', '', 'http://www.google.se', 'Välj');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);

    return navItems;
  }

}
