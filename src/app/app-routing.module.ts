import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { ApplicationAdministrationComponent } from './view/application.administration/application.administration.component';
import { UsersComponent } from './view/users/users.component';
import { UnitsComponent } from './view/units/units.component';
import { ManagementsComponent } from './view/managements/managements.component';
import { AdministrationComponent } from './view/administration/administration.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/user-admin/user-admin.component';
import { DefinitionsAdminComponent } from './view/administration/definitions/definitions-admin.component';

const routes: Routes = [
  {
    path: 'hem',
    component: HomeComponent
  },
  {
    path: 'koordinering',
    component: CoordinationLandingComponent
  },
  {
    path: 'koordinering/:management',
    component: CoordinationComponent
  },

  {
    path: 'administration',
    component: ApplicationAdministrationComponent
  },
  {
    path: 'administration/definition',
    component: DefinitionsAdminComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: 'units',
    component: UnitsComponent
  },

  {
    path: 'managements',
    component: ManagementsComponent
  },

  {
    path: 'areas',
    component: AdministrationComponent
  },
  {
    path: 'user-admin',
    component: UserAdminComponent
  },
  {
    path: 'styleguide',
    component: StyleguideComponent
  },
  {
    path: '**',
    redirectTo: 'hem'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
