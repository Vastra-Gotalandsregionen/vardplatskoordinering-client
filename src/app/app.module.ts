import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { DefinitionsAdminComponent } from './view/administration/definitions/definitions-admin.component';
import { CrudTableComponent } from './elements/crud-table/crud-table.component';
import { GenericEditDialogComponent } from './elements/generic-edit-dialog/generic-edit-dialog.component';
import { CreateUserDialogComponent } from './elements/create-user-dialog/create-user-dialog.component';
import { LayoutRowComponent } from './elements/layout-row/layout-row.component';
import { LayoutColumnComponent } from './elements/layout-column/layout-column.component';
import { LayoutComponent } from './elements/layout/layout.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { VpkButtonComponent } from './elements/vpk-button/vpk-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDeleteDialogComponent } from './elements/confirm-delete-dialog/confirm-delete-dialog.component';
import { VpkButtonRowComponent } from './elements/vpk-button-row/vpk-button-row.component';
import { VpkButtonFabComponent } from './elements/vpk-button-fab/vpk-button-fab.component';
import { VpkButtonFavoComponent} from './elements/vpk-button-favo/vpk-button-favo.component';
import { VpkNavigationCardsComponent } from './elements/vpk-navigation-cards/vpk-navigation-cards.component';
import { VpkNavigationCardComponent } from './elements/vpk-navigation-card/vpk-navigation-card.component';
import { VpkTitleRowComponent } from './elements/vpk-title-row/vpk-title-row.component';
import { VpkAlertComponent } from './elements/vpk-alert/vpk-alert.component';
import { VpkNavigationCardContentComponent } from './elements/vpk-navigation-card-content/vpk-navigation-card-content.component';
import { VpkListItemContentComponent } from './elements/vpk-list-item-content/vpk-list-item-content.component';
import { DegreeOfImpactComponent } from './view/administration/degree-of-impact/degree-of-impact.component';
import { DegreeOfImpactDialogComponent } from './elements/degree-of-impact-dialog/degree-of-impact-dialog.component';
import { ViewOnlyImpactDialogComponent } from './elements/view-only-impact-dialog/view-only-impact-dialog.component';
import { StateService } from './service/state.service';
import { LoginDialogComponent } from './elements/login-dialog/login-dialog.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './service/auth.service';
import { ErrorDialogComponent } from './elements/error-dialog/error-dialog.component';
import { RegistreraTableComponent } from './elements/registrera-table/registrera-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpErrorHandlerInterceptor } from './interceptor/http-error-handler-interceptor';
import { JwtHttpInterceptor } from './interceptor/jwt-http-interceptor';
import { VplLandingComponent } from './view/vpl-landing/vpl-landing.component';
import { VplAreasComponent } from './view/vpl-landing/vpl-areas/vpl-areas.component';
import { HasRoleGuard } from './guard/has-role.guard';
import { AdminGuard } from './guard/admin.guard';
import { LoginComponent } from './elements/login/login.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { MdePopoverModule } from '@material-extended/mde';
import { VpkBadgeComponent } from './elements/vpk-badge/vpk-badge.component';
import { DocumentsComponent } from './view/documents/documents.component';
import { VplComponent } from './view/vpl-landing/vpl-areas/vpl/vpl.component';
import { VplTableComponent } from './elements/vpl-table/vpl-table.component';
import { EditVplRegDialogComponent } from './elements/edit-vpl-reg-dialog/edit-vpl-reg-dialog.component';
import { DefinitionsComponent } from './view/definitions/definitions.component';
import { LinksComponent } from './view/administration/links/links.component';
import { VplLinksComponent } from './view/administration/vpl-links/vpl-links.component';
import { DefinitionCardComponent } from './elements/definition-card/definition-card.component';
import { VplAdministrationComponent } from './view/administration/vpl-administration/vpl-administration.component';
import { LoadingIndicatorComponent } from './elements/loading-indicator/loading-indicator.component';
import { GenerateEncodedPasswordComponent } from './view/generate-encoded-password/generate-encoded-password.component';

@NgModule({
  declarations: [
    AppComponent,
    // Elements
    EditRegistreraDialogComponent,
    CreateUserDialogComponent,
    GenericEditDialogComponent,
    HeaderComponent,
    LayoutComponent,
    LayoutColumnComponent,
    LayoutRowComponent,
    LoginComponent,
    VpkBadgeComponent,
    VpkButtonComponent,
    VpkButtonFabComponent,
    VpkButtonFavoComponent,
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
    DocumentsComponent,
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
    DegreeOfImpactComponent,
    DegreeOfImpactDialogComponent,
    ViewOnlyImpactDialogComponent,
    LoginDialogComponent,
    ErrorDialogComponent,
    RegistreraTableComponent,
    VplLandingComponent,
    VplAreasComponent,
    LoginPageComponent,
    VplComponent,
    VplTableComponent,
    EditVplRegDialogComponent,
    DefinitionsComponent,
    LinksComponent,
    VplLinksComponent,
    DefinitionCardComponent,
    VplAdministrationComponent,
    LoadingIndicatorComponent,
    GenerateEncodedPasswordComponent
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
    MdePopoverModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    MatMenuModule,
    JwtModule,
    DragDropModule
  ],
  providers: [
    AuthService,
    StateService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true},
    HasRoleGuard,
    AdminGuard
  ],
  entryComponents: [
    ConfirmDeleteDialogComponent,
    EditDecisionDialogComponent,
    EditRegistreraDialogComponent,
    EditVplRegDialogComponent,
    GenericEditDialogComponent,
    CreateUserDialogComponent,
    ErrorDialogComponent,
    LoginDialogComponent,
    CreateUserDialogComponent,
    DegreeOfImpactDialogComponent,
    ViewOnlyImpactDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
    library.add(far);
  }
}
