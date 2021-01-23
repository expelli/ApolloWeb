import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import { Hall } from '../classes/hall';
import { Movie } from '../classes/movie';
import { MovieAndScreening } from '../classes/movie-and-screening';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { Screening } from '../classes/screening';
import { ScreeningCompactPipe } from '../pipes/screening-compact.pipe';
import { HallService } from '../services/hall.service';
import { MovieService } from '../services/movie.service';
import { ScheduleService } from '../services/schedule.service';
//import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'Apollo-screening-management',
  templateUrl: './screening-management.component.html',
  styleUrls: ['./screening-management.component.css']
})
export class ScreeningManagementComponent implements OnInit {

  keyup = new EventEmitter<string>();
  constructor(
    private scheduleService: ScheduleService,
    private movieService: MovieService,
    private hallService: HallService) {
    this.newScreening = new Screening;
    this.newScreening.startTime = new Date;
    this.updScreening = new MovieAndScreening;
    this.updScreening.screening = new Screening;
    this.updScreening.movie = new Movie;
  }

  updateControl = new FormControl();

  movies!: Movie[];
  halls!: Hall[];

  screenings!: Observable<MovieAndScreening[]>

  delScreening!: MovieAndScreening;
  newScreening!: Screening;
  updScreening!: MovieAndScreening;

  ngOnInit(): void {
    //this.keyup.pipe(debounceTime(500), distinctUntilChanged(), switchMap((value: string) =>
      //this.scheduleService.screeningSearch(new Date, value))).subscribe(res => this.screenings = of(res));
    this.movieService.getAllMovies().subscribe(res => this.movies = res)
    this.hallService.getAllHalls().subscribe(res => this.halls = res);
    this.updateControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), switchMap((val: string, index) => {
      return this.scheduleService.screeningSearch(undefined, val,undefined);
    })).subscribe(res => {
      this.screenings = of(res);
    });
  }


  newScreeningMovieChanged(value: any) {
    this.newScreening.movie = value;
  }

  newScreeningHallChanged(value: any) {
    this.newScreening.hall = value;
  }


  updScreeningMovieChanged(value: any) {
    this.updScreening.movie = value;
  }

  updScreeningHallChanged(value: any) {
    this.updScreening!.screening!.hall = value;
  }



  displayMas(mas: MovieAndScreening): string {
    return (mas && mas!.screening && mas!.screening!.id!) ? (new ScreeningCompactPipe).transform(mas) : ''; 
  }

  deleteScreening() {
    this.scheduleService.deleteScreening(this.delScreening.screening!.id).subscribe();
  }

  updateScreening() {
  this.updScreening!.screening!.hall = undefined;
  this.updScreening!.screening!.movie = undefined;
    this.scheduleService.updateScreening(this.updScreening.screening!).subscribe();
  }

  addScreening() {
    this.newScreening.movieId = this.newScreening.movie?.id;
    this.newScreening.hallId = this.newScreening.hall?.id;
    this.newScreening.movie!.poster = undefined;
    this.scheduleService.addScreening(this.newScreening).subscribe();
  }

  //private _filter(movie: Movie): Observable<Movie[]> {
  // const filterValue = movie.title?.toLowerCase();
  //  return this.movies.pipe(filter(m => m.title.includes(filterValue)));
  //}

}
