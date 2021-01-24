import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieWithScreenings } from '../classes/movie-with-screenings';
import { ScreeningFreeSeats } from '../classes/screening-free-seats';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'Apollo-screening-list',
  templateUrl: './screening-list.component.html',
  styleUrls: ['./screening-list.component.css']
})
export class ScreeningListComponent implements OnInit {

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) {
    this.movieWithScreenings = new MovieWithScreenings;

  }

  movieWithScreenings!: MovieWithScreenings;

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.movieService.getMovieSchedule(params['id']).subscribe(res => {
          this.movieWithScreenings = res;
          this.movieWithScreenings.screenings = res.screenings!.filter(s => s.screening!.startTime! >= (new Date))
        });
      }
    });
  }
}

