import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Screening } from '../classes/screening';
import { DatePipe } from '@angular/common';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { MovieAndScreening } from '../classes/movie-and-screening';
import { Movie } from '../classes/movie';
import { ApiDatePipePipe } from '../pipes/api-date-pipe.pipe';

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

  screeningSearch(searchDate: Date|undefined,search: string |undefined, endDate: Date|undefined): Observable<Array<MovieAndScreening>>{
    var queryParams : string[]  = [];
    if (search) {
      queryParams.push("searchTerm="+search);
    }
    if (endDate) {
      queryParams.push(`endDate=${(new ApiDatePipePipe('en-US')).transform(endDate,"YYYY-MM-dd")}`);
    }

    if (searchDate) {
      queryParams.push(`searchDate=${(new ApiDatePipePipe('en-US')).transform(searchDate,"YYYY-MM-dd")}`);
    }
    
    var paramString = (queryParams.length != 0) ? "?"+queryParams.join("&") : "";

    return this.http.get<Array<MovieAndScreening>>(`${environment.server}/schedule/currentSchedule${paramString}`
    ).pipe(map(result => { 
      result.forEach(mas => {
      mas.screening!.startTime! = new Date(mas.screening!.startTime!);}); return result;}),catchError(this.errorHandler));
  }

  addScreening(screening: Screening): Observable<Screening>{
    return this.http.post(`${environment.server}/schedule`,screening).pipe(catchError(this.errorHandler));
  }

  deleteScreening(id: number | undefined){
    return this.http.delete(`${environment.server}/schedule/${id}`).pipe(catchError(this.errorHandler));
  }

  updateScreening(screening: Screening){
    return this.http.put(`${environment.server}/schedule/${screening.id}`,screening).pipe(catchError(this.errorHandler));
  }


}
