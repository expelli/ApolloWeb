import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { Movie } from '../classes/movie';
import { MovieAndScreening } from '../classes/movie-and-screening';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { Screening } from '../classes/screening';
import { ScreeningCompactPipe } from '../pipes/screening-compact.pipe';
import { MovieService } from '../services/movie.service';
import { ScheduleService } from '../services/schedule.service';
//import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'Apollo-screening-management',
  templateUrl: './screening-management.component.html',
  styleUrls: ['./screening-management.component.css']
})
export class ScreeningManagementComponent implements OnInit {

  deleteControl = new FormControl();
  constructor(private scheduleService: ScheduleService) { }

  screenings!: Observable<Array<MovieAndScreening>>

  delScreening!: MovieAndScreening;

  ngOnInit(): void {
    this.deleteControl.valueChanges.subscribe(value =>
    this.scheduleService.screeningSearch(new Date,value).subscribe(res => {this.screenings = of(res); console.log(this.screenings) }));
  }


  //   map(movie => movie ? this.allMovies.filter(m => m.title?.includes(movie.to))
  //: this.allMovies.slice()
  movies!: Observable<Movie[]>;
  allMovies!: Movie[];

  displayMas(mas: MovieAndScreening): string {
    return mas ? (new ScreeningCompactPipe).transform(mas) : '';
  }

  deleteScreening(){

  }

  //private _filter(movie: Movie): Observable<Movie[]> {
  // const filterValue = movie.title?.toLowerCase();
  //  return this.movies.pipe(filter(m => m.title.includes(filterValue)));
  //}

}
