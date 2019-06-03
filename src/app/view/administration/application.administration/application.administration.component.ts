import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../../domain/NavItem';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-administration',
  templateUrl: './application.administration.component.html',
  styleUrls: ['./application.administration.component.scss']
})
export class ApplicationAdministrationComponent implements OnInit {

  navItems: NavItem[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {

    this.authService.isUserLoggedIn.subscribe(_ => {
      const navItems: NavItem[]  = [];

      if (this.authService.isAdmin()) {
        navItems.push(new NavItem('Förvaltningar', 'Välj', '/administration/managements', '', ''));
        navItems.push(new NavItem('Definitioner', 'Välj', '/administration/definition', '', ''));
        navItems.push(new NavItem('Grad av påverkan', 'Välj', '/administration/degreeOfImpact', '', ''));
      }

      if (this.authService.hasAdministrationAdministrationPermission) {
        navItems.push(new NavItem('Områden', 'Välj', '/administration/areas', '', ''));
      }

      if (this.authService.hasUnitAdministrationPermission) {
        navItems.push(new NavItem('Avdelningar', 'Välj', '/administration/units', '', ''));
      }

      if (this.authService.hasApplicationAdministrationPermission) {
        navItems.push(new NavItem('Användare', 'Välj', '/administration/user-admin', '', ''));
      }

      this.navItems = navItems;
    });
  }

  getNavItems(): NavItem[] {
    const navItems: NavItem[]  = [];

    const navItem1 = new NavItem('Förvaltningar', 'Välj', '/administration/managements', '', '');
    const navItem2 = new NavItem('Områden', 'Välj', '/administration/areas', '', '');
    const navItem3 = new NavItem('Avdelningar', 'Välj', '/administration/units', '', '');
    const navItem4 = new NavItem('Användare', 'Välj', '/administration/user-admin', '', '');
    const navItem5 = new NavItem('Definitioner', 'Välj', '/administration/definition', '', '');
    const navItem6 = new NavItem('Grad av påverkan', 'Välj', '/administration/degreeOfImpact', '', '');


    navItems.push(navItem1);
    navItems.push(navItem2);
    navItems.push(navItem3);
    navItems.push(navItem4);
    navItems.push(navItem5);
    navItems.push(navItem6);


    return navItems;
  }


}
