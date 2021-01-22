import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../classes/category';
import { Genre } from '../classes/genre';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  getAllCategories(): Observable<Array<Category>>{
    return this.http.get<Array<Category>>(`${environment.server}/priceCategory`).pipe(catchError(this.errorHandler));
  }

  addCategory(category: Category): Observable<Genre>{
    return this.http.post(`${environment.server}/priceCategory`,category).pipe(catchError(this.errorHandler));
  }

  deleteCategory(id: number | undefined){
    return this.http.delete(`${environment.server}/priceCategory/${id}`).pipe(catchError(this.errorHandler));
  }

  updateCategory(category: Category){
    return this.http.put(`${environment.server}/priceCategory/${category.id}`,category).pipe(catchError(this.errorHandler));
  }
}
