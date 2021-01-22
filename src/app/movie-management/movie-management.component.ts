import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genre } from '../classes/genre';
import { Movie } from '../classes/movie';
import { GenreService } from '../services/genre.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'Apollo-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.css']
})
export class MovieManagementComponent implements OnInit {


  constructor(private movieService: MovieService, 
    private genreService: GenreService, 
    private snackBar: MatSnackBar) { 
      this.newMovie = new Movie; 
      this.newMovie.genre = new Genre; this.delMovie = new Movie; 
      this.updMovie = new Movie;
      this.delMovie  = new Movie;
    }

  newMovie!: Movie;
  delMovie!: Movie;
  updMovie!: Movie;

  movies!: Movie[];


  genres!: Genre[];

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(res => this.genres = res);
    this.movieService.getAllMovies().subscribe(res => this.movies = res);
  }

  addMovie() {
    this.newMovie.genreId = this.newMovie.genre?.id;
    this.movieService.addMovie(this.newMovie).subscribe();

    //this.addForm.reset(this.newGenre);
  }
  deleteMovie() {
    this.movieService.deleteMovie(this.delMovie.id).subscribe();

    //this.addForm.reset(this.newGenre);
  }
  updateMovie() {
    this.movieService.updateMovie(this.updMovie).subscribe();

    //this.addForm.reset(this.newGenre);
  }

  addGenreChanged(value: any) {
    console.log("old: "+this.newMovie.genre);
  
    this.newMovie.genre = value;
    console.log(value);
  }

  updGenreChanged(value: any) {
    console.log("old: "+value);
    this.updMovie.genreId = value;
    console.log(value);
  }

  delGenreChanged(value: any) {
    this.delMovie = value;
  }

  delMovieChanged(value: any){
    this.delMovie = value;
  }

  updMovieChanged(value: any) {
    this.updMovie = value;
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }


}
