import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { Movie } from '../classes/movie';
import { MovieAndScreening } from '../classes/movie-and-screening';
import { Screening } from '../classes/screening';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'Apollo-schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrls: ['./schedule-overview.component.css']
})
export class ScheduleOverviewComponent implements OnInit {

  searchControl = new FormControl();
  constructor(private scheduleService: ScheduleService) {  this.searchMAS = new MovieAndScreening; this.searchMAS.movie = new Movie; this.searchMAS.movie.title = ""; }

  schedule!: Observable<MovieAndScreening[]>;
  searchMAS!: MovieAndScreening;

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(value =>
      this.scheduleService.screeningSearch(new Date,value.movie.title).subscribe(res => {this.schedule = of(res); console.log(this.schedule) }));
  }

  getSchedule(): Array<MovieAndScreening> {
    let result: MovieAndScreening[] = [];
    this.schedule.subscribe(res => result = res);
    return result;
  }

  displayMovie(mas: MovieAndScreening): string {
    return mas ? mas.movie!.title! : '';
  }

}
