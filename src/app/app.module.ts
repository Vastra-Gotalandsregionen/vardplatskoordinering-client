import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

// Elements
import { HeaderComponent } from './elements/header/header.component';
import { VpkCardComponent } from './elements/vpk-card/vpk-card.component';

// Views
import { HomeComponent } from './view/home/home.component';
import { CoordinationComponent } from './view/coordination/coordination.component';
import { StyleguideComponent } from './view/styleguide/styleguide.component';

@NgModule({
  declarations: [
    AppComponent,
    // Elements
    HeaderComponent,
    VpkCardComponent,
    //Views
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
    FlexLayoutModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
