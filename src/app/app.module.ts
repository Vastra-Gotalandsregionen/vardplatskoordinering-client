import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './elements/header/header.component';
import { VpkIconComponent } from './elements/vpk-icon/vpk-icon.component';
import { EditRegistreraDialogComponent } from './elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VpkCardComponent } from './elements/vpk-card/vpk-card.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { VpkListComponent } from './elements/vpk-list/vpk-list.component';
import { VpkListItemComponent } from './elements/vpk-list-item/vpk-list-item.component';
import { DecisionTableComponent } from './elements/decision-table/decision-table.component';
import { EditDecisionDialogComponent } from './elements/edit-decision-dialog/edit-decision-dialog.component';
import { ApplicationAdministrationComponent } from './view/application.administration/application.administration.component';
import { UnitsComponent } from './view/units/units.component';
import { UsersComponent } from './view/users/users.component';
import { ManagementsComponent } from './view/managements/managements.component';
import { AdministrationComponent } from './view/administration/administration.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/user-admin/user-admin.component';
import { EditUserDialogComponent } from './elements/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    // Elements
    HeaderComponent,
    EditRegistreraDialogComponent,
    EditUserDialogComponent,
    VpkCardComponent,
    VpkIconComponent,
    VpkListComponent,
    VpkListItemComponent,
    // Views
    HomeComponent,
    CoordinationComponent,
    StyleguideComponent,
    DecisionTableComponent,
    EditDecisionDialogComponent,
    CoordinationLandingComponent,
    UserAdminComponent,
    EditDecisionDialogComponent,
    ApplicationAdministrationComponent,
    UnitsComponent,
    UsersComponent,
    ManagementsComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [
    EditDecisionDialogComponent,
    EditRegistreraDialogComponent,
    EditUserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
    library.add(far);
  }
}
