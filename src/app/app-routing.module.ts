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
import { VplLandingComponent } from './view/vpl-landing/vpl-landing.component';
import { VplAreasComponent } from './view/vpl-landing/vpl-areas/vpl-areas.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { AdminGuard } from './guard/admin.guard';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { VplComponent } from './view/vpl-landing/vpl-areas/vpl/vpl.component';
import { DefinitionsComponent } from './view/definitions/definitions.component';
import { LinksComponent } from './view/administration/links/links.component';
import { VplLinksComponent } from './view/administration/vpl-links/vpl-links.component';
import {VplAdministrationComponent} from './view/administration/vpl-administration/vpl-administration.component';
import {GenerateEncodedPasswordComponent} from "./view/generate-encoded-password/generate-encoded-password.component";

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
    path: 'definitions',
    component: DefinitionsComponent
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
    path: 'administration/links',
    component: LinksComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPK_MANAGER']}
  },

  {
    path: 'administration/vpl-links',
    component: VplLinksComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPL_MANAGER']}
  },

  {
    path: 'administration/vpl-admin',
    component: VplAdministrationComponent,
    canActivate: [HasRoleGuard],
    data: {roles: ['ADMIN', 'VPL_MANAGER']}
  },

  {
    path: 'vpl',
    component: VplLandingComponent
  },

  {
    path: 'vpl/:management',
    component: VplAreasComponent
  },

  {
    path: 'vpl/:management/:administration',
    component: VplComponent
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
    path: 'genpass',
    component: GenerateEncodedPasswordComponent
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
