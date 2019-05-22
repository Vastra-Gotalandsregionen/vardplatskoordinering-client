import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../domain/NavItem';

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
    const navItems: NavItem[]  = [];

    const navItem1 = new NavItem('Förvaltningar', 'Välj', '/administration/managements', '', '');
    const navItem2 = new NavItem('Områden', 'Välj', '/administration/areas', '', '');
    const navItem3 = new NavItem('Avdelningar', 'Välj', '/administration/units', '', '');
    const navItem4 = new NavItem('Användare', 'Välj', '/administration/user-admin', '', '');
    const navItem5 = new NavItem('Definitioner', 'Välj', '/administration/definition', '', '');

    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);
    navItems.push(navItem5);

    return navItems;
  }


}
