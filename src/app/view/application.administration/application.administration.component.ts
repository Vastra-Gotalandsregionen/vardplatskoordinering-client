import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../domain/NavItem';

@Component({
  selector: 'app-administration',
  templateUrl: './application.administration.component.html',
  styleUrls: ['./application.administration.component.scss']
})
export class ApplicationAdministrationComponent implements OnInit {

  navItems: NavItem[] = [];

  constructor() { }

  ngOnInit() {
    this.navItems = this.getNavItems();
  }

  getNavItems(): NavItem[] {
    let navItems: NavItem[]  = [];

    let navItem1 = new NavItem('Förvaltningar', 'Välj', '/managements', '', '');
    let navItem2 = new NavItem('Områden', 'Välj', '/areas', '', '');
    let navItem3 = new NavItem('Avdelningar', 'Välj', '/units', '', '');
    let navItem4 = new NavItem('Användare', 'Välj', '/user-admin', '', '');
    let navItem5 = new NavItem('Definitioner', 'Välj', '/administration/definition', '', '');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);
    navItems.push(navItem5);

    return navItems;
  }


}
