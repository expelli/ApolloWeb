import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../classes/movie';
import { GenreService } from '../services/genre.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'Apollo-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie!: Movie;

  constructor(private route: ActivatedRoute, 
    private movieService: MovieService,
    private genreService: GenreService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.movieService.getMovieById(params['id']).subscribe(
      res => { this.genreService.getGenreById(res.genreId).subscribe(gen => res.genre = gen), 
        this.movie = res;console.log(this.movie.trailer) ;console.log(this.movie.trailer?.split("=")[1])}));
  }

}
