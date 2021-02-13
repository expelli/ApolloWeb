import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { from, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
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
  constructor(private scheduleService: ScheduleService) { 
    this.schedule = from([]);
    this.endDate = new Date;
    this.endDate.setDate(this.endDate.getDate() + 14)
  }

  schedule!: Observable<MovieAndScreening[]>;
  searchDate!: Date;
  endDate!: Date;

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), switchMap((val: string, index) => {
      return this.scheduleService.screeningSearch(this.searchDate, val,this.endDate);
    })).subscribe(res => {
      this.schedule = of(res);
    });
    this.scheduleService.screeningSearch(this.searchDate,undefined,this.endDate).subscribe(res => {
      this.schedule = of(res);
    });
  }

  getSchedule(): Array<MovieAndScreening> {
    let result: MovieAndScreening[] = [];
    this.schedule.subscribe(res => result = res);
    return result;
  }

  displayMovie(mas: string): string {
    return mas;
  }

  public onSearchDate(): void {
    this.scheduleService.screeningSearch(this.searchDate,undefined,this.endDate).subscribe(res => {
      this.schedule = of(res);
    });
  }

}
