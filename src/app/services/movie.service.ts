import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../classes/movie';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { ScreeningFreeSeats } from '../classes/screening-free-seats';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 

  getAllMovies(): Observable<Array<Movie>>{
    return this.http.get<Array<Movie>>(`${environment.server}/movie`).pipe(catchError(this.errorHandler));
  }

  getSomeMovies(search: string): Observable<Array<Movie>>{
    return (this.http.get<Array<Movie>>(`${environment.server}/movie/search/${search}`).pipe(catchError(this.errorHandler)));
  }


  getMovieById(id: number):Observable<Movie>{
    return (this.http.get<Array<Movie>>(`${environment.server}/movie/${id}`).pipe(catchError(this.errorHandler)));
  }

  getMovieSchedule(id: number): Observable<MovieWithScreenings>{
    return (this.http.get<Array<Movie>>(`${environment.server}/movie/currentSchedule/${id}`).pipe(catchError(this.errorHandler)));
  }


  
  addMovie(movie: Movie): Observable<Movie>{
    return this.http.post(`${environment.server}/movie`,movie).pipe(catchError(this.errorHandler));
  }

  deleteMovie(id: number | undefined){
    return this.http.delete(`${environment.server}/movie/${id}`).pipe(catchError(this.errorHandler));
  }

  updateMovie(movie: Movie){
    return this.http.put(`${environment.server}/movie/${movie.id}`,movie).pipe(catchError(this.errorHandler));
  }
}
