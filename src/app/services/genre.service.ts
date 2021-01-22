import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Genre } from '../classes/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  getAllGenres(): Observable<Array<Genre>>{
    return this.http.get<Array<Genre>>(`${environment.server}/genre`).pipe(catchError(this.errorHandler));
  }

  addGenre(genre: Genre): Observable<Genre>{
    return this.http.post(`${environment.server}/genre`,genre).pipe(catchError(this.errorHandler));
  }

  deleteGenre(id: string | undefined){
    return this.http.delete(`${environment.server}/genre/${id}`).pipe(catchError(this.errorHandler));
  }

  updateGenre(genre: Genre){
    return this.http.put(`${environment.server}/genre/${genre.id}`,genre).pipe(catchError(this.errorHandler));
  }

  getGenreById(id: string | undefined): Observable<Genre>{
    return this.http.get(`${environment.server}/genre/${id}`).pipe(catchError(this.errorHandler));
  }
}
