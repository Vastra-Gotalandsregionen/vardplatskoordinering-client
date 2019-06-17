import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavItem } from '../../../domain/NavItem';
import { AuthService } from '../../../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './application.administration.component.html',
  styleUrls: ['./application.administration.component.scss']
})
export class ApplicationAdministrationComponent implements OnInit, OnDestroy {

  navItems: NavItem[] = [];

  constructor(private authService: AuthService) { }

  private subscription: Subscription;

  ngOnInit() {

    this.subscription = this.authService.isUserLoggedIn.subscribe(_ => {
      const navItems: NavItem[] = [];

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

      if (this.authService.hasVpkManagementAdminPermission()) {
        navItems.push(new NavItem('Länkar Vårdplatskoordinering', 'Välj', '/administration/links', '', ''));
      }

      if (this.authService.hasVplManagementAdminPermission()) {
        navItems.push(new NavItem('Länkar Vårdplatsläget', 'Välj', '/administration/vpl-links', '', ''));
      }

      this.navItems = navItems;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
