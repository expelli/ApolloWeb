import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../classes/movie';
import { Screening } from '../classes/screening';
import { ScreeningFreeSeats } from '../classes/screening-free-seats';

@Component({
  selector: 'Apollo-screening-list-item',
  templateUrl: './screening-list-item.component.html',
  styleUrls: ['./screening-list-item.component.css']
})
export class ScreeningListItemComponent implements OnInit {

  @Input() screening!: ScreeningFreeSeats;
  @Input() movie!: Movie;

  constructor() {
    this.movie = new Movie;
    this.screening = new ScreeningFreeSeats;
   }

  ngOnInit(): void {
  }

}
