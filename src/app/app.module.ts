import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

//material ui
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { GenreManagementComponent } from './genre-management/genre-management.component';
import { ScheduleOverviewComponent } from './schedule-overview/schedule-overview.component';
import { ScheduleItemComponent } from './schedule-item/schedule-item.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs'
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { HallManagementComponent } from './hall-management/hall-management.component';
import { ScreeningManagementComponent } from './screening-management/screening-management.component';
import { GenreCompactPipe } from './pipes/genre-compact.pipe';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryCompactPipe } from './pipes/category-compact.pipe';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScreeningListComponent } from './screening-list/screening-list.component';
import { ScreeningListItemComponent } from './screening-list-item/screening-list-item.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoUrlIframePipe } from './pipes/video-url-iframe.pipe';
import { RowControlComponent } from './row-control/row-control.component';
import { RowEditorComponent } from './row-editor/row-editor.component';
import { MatChipsModule } from '@angular/material/chips';
import { ScreeningCompactPipe } from './pipes/screening-compact.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { ApiDatePipePipe } from './pipes/api-date-pipe.pipe';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    MovieSearchComponent,
    CustomerViewComponent,
    AdminViewComponent,
    GenreManagementComponent,
    ScheduleOverviewComponent,
    ScheduleItemComponent,
    CategoryManagementComponent,
    MovieManagementComponent,
    HallManagementComponent,
    ScreeningManagementComponent,
    GenreCompactPipe,
    CategoryCompactPipe,
    MovieDetailsComponent,
    ScreeningListComponent,
    ScreeningListItemComponent,
    VideoUrlIframePipe,
    RowControlComponent,
    RowEditorComponent,
    ScreeningCompactPipe,
    ApiDatePipePipe
  ],
  imports: [
    FlexLayoutModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    YouTubePlayerModule,
    MatChipsModule,
    MatDatepickerModule,

    //
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    NgxMatNativeDateModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
