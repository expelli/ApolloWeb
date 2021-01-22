import { Component, Input, OnInit } from '@angular/core';
import { MovieAndScreening } from '../classes/movie-and-screening';

@Component({
  selector: 'Apollo-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() movieAndScreening!: MovieAndScreening

  constructor() { }

  ngOnInit(): void {
  }

}
