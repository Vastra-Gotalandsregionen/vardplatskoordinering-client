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
import { ApplicationAdministrationComponent } from './view/administration/application.administration/application.administration.component';
import { UnitsComponent } from './view/administration/units/units.component';
import { ManagementsComponent } from './view/administration/managements/managements.component';
import { AdministrationComponent } from './view/administration/administration/administration.component';
import { CoordinationLandingComponent } from './view/coordination-landing/coordination-landing.component';
import { UserAdminComponent } from './view/administration/user-admin/user-admin.component';
import { EditUserDialogComponent } from './elements/edit-user-dialog/edit-user-dialog.component';
import { DefinitionsAdminComponent } from './view/administration/definitions/definitions-admin.component';
import { CrudTableComponent } from './elements/crud-table/crud-table.component';
import { GenericEditDialogComponent } from './elements/generic-edit-dialog/generic-edit-dialog.component';
import { CreateUserDialogComponent } from './elements/create-user-dialog/create-user-dialog.component';
import { LayoutRowComponent } from './elements/layout-row/layout-row.component';
import { LayoutColumnComponent } from './elements/layout-column/layout-column.component';
import { LayoutComponent } from './elements/layout/layout.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { VpkButtonComponent } from './elements/vpk-button/vpk-button.component';
import { MatMenuModule } from '@angular/material';
import { ConfirmDeleteDialogComponent } from './elements/confirm-delete-dialog/confirm-delete-dialog.component';
import { VpkButtonRowComponent } from './elements/vpk-button-row/vpk-button-row.component';
import { VpkButtonFabComponent } from './elements/vpk-button-fab/vpk-button-fab.component';
import { VpkNavigationCardsComponent } from './elements/vpk-navigation-cards/vpk-navigation-cards.component';
import { VpkNavigationCardComponent } from './elements/vpk-navigation-card/vpk-navigation-card.component';
import { VpkTitleRowComponent } from './elements/vpk-title-row/vpk-title-row.component';
import { VpkAlertComponent } from './elements/vpk-alert/vpk-alert.component';
import { VpkNavigationCardContentComponent } from './elements/vpk-navigation-card-content/vpk-navigation-card-content.component';
import { VpkListItemContentComponent } from './elements/vpk-list-item-content/vpk-list-item-content.component';
import { DegreeOfImpactComponent } from './view/administration/degree-of-impact/degree-of-impact.component';

@NgModule({
  declarations: [
    AppComponent,
    // Elements
    HeaderComponent,
    EditRegistreraDialogComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    LayoutComponent,
    LayoutColumnComponent,
    LayoutRowComponent,
    VpkButtonComponent,
    VpkButtonFabComponent,
    VpkButtonRowComponent,
    VpkCardComponent,
    VpkIconComponent,
    VpkListComponent,
    VpkListItemContentComponent,
    VpkListItemComponent,
    VpkAlertComponent,
    VpkNavigationCardComponent,
    VpkNavigationCardContentComponent,
    VpkNavigationCardsComponent,
    VpkTitleRowComponent,
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
    ManagementsComponent,
    AdministrationComponent,
    DefinitionsAdminComponent,
    CrudTableComponent,
    GenericEditDialogComponent,
    ConfirmDeleteDialogComponent,
    GenericEditDialogComponent,
    DegreeOfImpactComponent
    // Attribute Directives

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
    CKEditorModule,
    MatMenuModule
  ],
  providers: [],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    EditDecisionDialogComponent,
    EditRegistreraDialogComponent,
    EditUserDialogComponent,
    GenericEditDialogComponent,
    EditUserDialogComponent,
    CreateUserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
    library.add(far);
  }
}
