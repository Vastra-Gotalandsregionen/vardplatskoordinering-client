import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './module/material.module';
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './elements/header/header.component';
import { VpkIconComponent } from './elements/vpk-icon/vpk-icon.component';
import { EditRegistreraDialogComponent } from './elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VpkCardComponent } from './elements/vpk-card/vpk-card.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    // Elements
    HeaderComponent,
    EditRegistreraDialogComponent,
    VpkCardComponent,
    VpkIconComponent,
    // Views
    HomeComponent,
    CoordinationComponent,
    StyleguideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [
    EditRegistreraDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas);
  }
}
