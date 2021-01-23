import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Screening } from '../classes/screening';
import { DatePipe } from '@angular/common';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { MovieAndScreening } from '../classes/movie-and-screening';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient,private datepipe: DatePipe) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);
  } 
  
  getAllScreenings(): Observable<Array<Screening>>{
    return this.http.get<Array<Screening>>(`${environment.server}/schedule`).pipe(catchError(this.errorHandler));
  }

  screeningSearch(screeningDate: Date,search: string): Observable<Array<MovieAndScreening>>{
    return this.http.get<Array<Screening>>(`${environment.server}/schedule/currentSchedule?searchTerm=${search}`).pipe(catchError(this.errorHandler));
  }

  addScreening(screening: Screening): Observable<Screening>{
    return this.http.post(`${environment.server}/schedule`,screening).pipe(catchError(this.errorHandler));
  }

  deleteScreening(id: number | undefined){
    return this.http.delete(`${environment.server}/schedule/${id}`).pipe(catchError(this.errorHandler));
  }

}
