import { componentFactoryName } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CanNavigateToAdminGuard } from './can-navigate-to-admin.guard';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { GenreManagementComponent } from './genre-management/genre-management.component';
import { HallManagementComponent } from './hall-management/hall-management.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { ScreeningManagementComponent } from './screening-management/screening-management.component';

const routes: Routes = [{
  path: '',
  component: CustomerViewComponent
},
{
  path: 'admin',
  canActivate: [CanNavigateToAdminGuard],
  component: AdminViewComponent,
  children: [
    { path: 'genre', outlet: 'admin-outlet', component: GenreManagementComponent },
    { path: 'category', outlet: 'admin-outlet', component: CategoryManagementComponent },
    { path: 'movie', outlet: 'admin-outlet', component: MovieManagementComponent },
    { path: 'hall', outlet: 'admin-outlet', component: HallManagementComponent },
    { path: 'screening', outlet: 'admin-outlet', component: ScreeningManagementComponent }]
}, {
  path: 'index.html',
  redirectTo: '',
  pathMatch: 'full' 
},
{
  path: 'movie/:id',
  component: MovieDetailsComponent
}//,
  //{
  ///path: 'genre',
  //outlet: 'admin-outlet',
  //component: GenreManagementComponent,
  //

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
