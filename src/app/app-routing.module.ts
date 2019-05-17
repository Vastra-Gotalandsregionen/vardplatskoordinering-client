import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/user-admin/user-admin.component';

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
