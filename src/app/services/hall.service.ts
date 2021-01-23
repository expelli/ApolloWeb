import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hall } from '../classes/hall';

@Injectable({
  providedIn: 'root'
})
export class HallService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(null);

  }

  getAllHalls(): Observable<Array<Hall>> {
    return this.http.get<Array<Hall>>(`${environment.server}/hall`).pipe(catchError(this.errorHandler));
  }

  getHallDeepById(id: number): Observable<Hall> {
    return this.http.get<Array<Hall>>(`${environment.server}/hall/${id}?loadDeep=true`).pipe(catchError(this.errorHandler));
  }

  deleteHall(id: number | undefined) {
    return this.http.delete(`${environment.server}/hall/${id}`).pipe(catchError(this.errorHandler));
  }

  addHall(hall: Hall): Observable<Hall> {
    return this.http.post(`${environment.server}/hall`, hall).pipe(catchError(this.errorHandler));
  }

  updateHall(hall: Hall) {
    return this.http.put(`${environment.server}/hall/${hall.id}`, hall).pipe(catchError(this.errorHandler));
  }
}
