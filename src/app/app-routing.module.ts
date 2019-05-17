import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { AdministrationComponent } from './view/administration/administration.component';
import { UsersComponent } from './view/users/users.component';
import { UnitsComponent } from './view/units/units.component';
import { ManagementsComponent } from './view/managements/managements.component';
import { AreasComponent } from './view/areas/areas.component';

const routes: Routes = [
  {
    path: 'hem',
    component: HomeComponent
  },
  {
    path: 'koordinering',
    component: CoordinationComponent
  },

  {
    path: 'administration',
    component: AdministrationComponent
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
    component: AreasComponent
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
