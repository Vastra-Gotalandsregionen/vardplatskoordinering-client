import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { DocumentsComponent } from './view/documents/documents.component';
import { ApplicationAdministrationComponent } from './view/administration/application.administration/application.administration.component';
import { UnitsComponent } from './view/administration/units/units.component';
import { ManagementsComponent } from './view/administration/managements/managements.component';
import { AdministrationComponent } from './view/administration/administration/administration.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/administration/user-admin/user-admin.component';
import { DefinitionsAdminComponent } from './view/administration/definitions/definitions-admin.component';
import { DegreeOfImpactComponent } from './view/administration/degree-of-impact/degree-of-impact.component';
import { VplComponent } from './view/vpl/vpl.component';
import { VplAreasComponent } from './view/vpl-areas/vpl-areas.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { AdminGuard } from './guard/admin.guard';
import { LoginPageComponent } from './view/login-page/login-page.component';

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
    path: 'dokument',
    component: DocumentsComponent
  },
  {
    path: 'administration',
    component: ApplicationAdministrationComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPK_MANAGER', 'VPL_MANAGER']}
  },
  {
    path: 'administration/definition',
    component: DefinitionsAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'administration/units',
    component: UnitsComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPL_MANAGER']}
  },

  {
    path: 'administration/managements',
    component: ManagementsComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'administration/areas',
    component: AdministrationComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPK_MANAGER', 'VPL_MANAGER']}
  },

  {
    path: 'administration/degreeOfImpact',
    component: DegreeOfImpactComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'administration/user-admin',
    component: UserAdminComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPK_MANAGER', 'VPL_MANAGER']}
  },

  {
    path: 'vpl',
    component: VplComponent
  },
  {
    path: 'vpl/:management',
    component: VplAreasComponent
  },
  {
    path: 'styleguide',
    component: StyleguideComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
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
