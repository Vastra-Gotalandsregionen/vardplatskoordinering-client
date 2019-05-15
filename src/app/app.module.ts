import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './view/home/home.component';
import { HeaderComponent } from './elements/header/header.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { MaterialModule } from './module/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { EditRegistreraDialogComponent } from './elements/edit-registrera-dialog/edit-registrera-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CoordinationComponent,
    EditRegistreraDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
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
}
