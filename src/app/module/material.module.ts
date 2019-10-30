import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorIntlSv } from './mat-paginator-intl-sv';
import { SwedishDateAdapter } from '../angular/swedish-date-adapter';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    // MatCheckboxModule,
    MatInputModule,
    // MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    // MatRadioModule,
    MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatMenuModule,
    // MatSidenavModule,
    // MatGridListModule,
    // MatStepperModule,
    // MatTabsModule,
    MatExpansionModule,
    // MatButtonToggleModule,
    // MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // MatProgressBarModule,
    MatDialogModule,
    // MatTooltipModule,
    // MatSnackBarModule,
    MatTableModule,
    // MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    // MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    // MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    // MatRadioModule,
    MatSelectModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatMenuModule,
    // MatSidenavModule,
    // MatGridListModule,
    // MatStepperModule,
    // MatTabsModule,
    MatExpansionModule,
    // MatButtonToggleModule,
    // MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    // MatProgressBarModule,
    MatDialogModule,
    // MatTooltipModule,
    // MatSnackBarModule,
    MatTableModule,
    // MatSortModule,
    MatPaginatorModule,
    MatTooltipModule
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: MatPaginatorIntlSv},
    {provide: DateAdapter, useClass: SwedishDateAdapter},
    {provide: MAT_DATE_LOCALE, useValue: 'sv-SE'},
  ]
})
export class MaterialModule {
}
