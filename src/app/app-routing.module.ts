import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { ApplicationAdministrationComponent } from './view/administration/application.administration/application.administration.component';
import { UnitsComponent } from './view/administration/units/units.component';
import { ManagementsComponent } from './view/administration/managements/managements.component';
import { AdministrationComponent } from './view/administration/administration/administration.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/administration/user-admin/user-admin.component';
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
    path: 'administration/units',
    component: UnitsComponent
  },

  {
    path: 'administration/managements',
    component: ManagementsComponent
  },

  {
    path: 'administration/areas',
    component: AdministrationComponent
  },
  {
    path: 'administration/user-admin',
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
