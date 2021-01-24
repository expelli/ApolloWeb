import { Component, EventEmitter, OnInit } from '@angular/core';
import { Hall } from '../classes/hall';
import { Movie } from '../classes/movie';
import { MovieAndScreening } from '../classes/movie-and-screening';
import { Screening } from '../classes/screening';
import { HallService } from '../services/hall.service';
import { MovieService } from '../services/movie.service';
import { ScheduleService } from '../services/schedule.service';


@Component({
  selector: 'Apollo-screening-management',
  templateUrl: './screening-management.component.html',
  styleUrls: ['./screening-management.component.css']
})
export class ScreeningManagementComponent implements OnInit {

 
  constructor(
    private scheduleService: ScheduleService,
    private movieService: MovieService,
    private hallService: HallService) {
    this.initializeData();
  }

  //members
  delScreening!: Screening;
  newScreening!: Screening;
  updScreening!: MovieAndScreening;
  // combo boxes
  movies!: Movie[];
  halls!: Hall[];
  screenings!: Screening[];

  initializeData() {
    this.newScreening = new Screening;
    this.updScreening = new MovieAndScreening;
    this.updScreening.screening = new Screening;
    this.updScreening.movie = new Movie;
  }
  
  loadData(){
    this.movieService.getAllMovies().subscribe(res => this.movies = res);
    this.hallService.getAllHalls().subscribe(res => this.halls = res);
    this.scheduleService.getAllScreenings().subscribe(res => this.screenings = res );
    this.initializeData()
  }

  ngOnInit(): void {;
    this.loadData();
  }
  

  deleteScreening() {
    this.scheduleService.deleteScreening(this.delScreening.id).subscribe(res => {this.loadData(); return res;});
  }

  updateScreening() {
  this.updScreening!.screening!.hall = undefined;
  this.updScreening!.screening!.movie = undefined;
    this.scheduleService.updateScreening(this.updScreening.screening!).subscribe(res => {this.loadData(); return res;});
  }

  addScreening() {
    this.newScreening.movieId = this.newScreening.movie?.id;
    this.newScreening.hallId = this.newScreening.hall?.id;
    this.newScreening.movie!.poster = undefined;
    this.scheduleService.addScreening(this.newScreening).subscribe(res => {this.loadData(); return res;});
  }

  // ====== combo box selectionChange =====

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

  updScreeningChanged(value: any){
    //using JSON for achieving a deep copy => selection list won't be changed this way
    this.updScreening.screening =  JSON.parse(JSON.stringify(value));
  }

  delScreeningChanged(value: any){
    this.delScreening = value;
  }
}
