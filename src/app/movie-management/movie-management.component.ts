import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Base64Movie } from '../classes/base64-movie';
import { Base64MovieImageOption } from '../classes/base64-movie-image-option';
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
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private movieService: MovieService,
    private genreService: GenreService,
    private snackBar: MatSnackBar) {
    this.initializeData();
  }

  //members
  newImageTag = 'Bild auswählen';
  updImageTag = 'Bild nicht verändert'
  newMovie!: Base64Movie;
  delMovie?: Movie;
  updMovie!: Base64MovieImageOption;
  // combo boxes
  movies!: Movie[];
  genres!: Genre[];

  loadData() {
    this.initializeData();
    this.genreService.getAllGenres().subscribe(res => this.genres = res);
    this.movieService.getAllMovies().subscribe(res => this.movies = res);
  }

  initializeData() {
    this.newMovie = new Base64Movie;
    this.newMovie.movie = new Movie;
    this.newMovie.duration = 0;
    this.newMovie.genreId = undefined;
    this.delMovie = undefined;
    this.updMovie = new Base64MovieImageOption;
    this.updMovie.updatePoster = false;
  }

  ngOnInit(): void {
    this.loadData();
  }

  // file upload for new movie
  uploadFileEvtAdd(imgFile: any) {
    // a mix of a lot of stack overflow posts but it's working
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.newImageTag = imgFile.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.updMovie.poster = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.updMovie.updatePoster = true;
      this.fileInput.nativeElement.value = "";
    } else {
      this.newImageTag = 'Bild auswählen';
    }
  }

  //file upload for updating a movie
  uploadFileEvtUpd(imgFile: any) {
    // a mix of a lot of stack overflow posts but it's working
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.updImageTag = imgFile.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.updMovie.poster = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      this.fileInput.nativeElement.value = "";
    } else {
      this.updImageTag = 'Bild nicht verändert';
    }
  }

  addMovie() {
    this.movieService.addMovie(this.newMovie).subscribe();
    this.loadData(); //resetting everything
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.delMovie?.id).subscribe();
    this.loadData(); //resetting everything
  }

  updateMovie() {
    this.movieService.updateMovie(this.updMovie).subscribe();
    this.loadData(); //resetting everything
  }

  // === combo box selectionChange ===

  addGenreChanged(value: any) {
    this.newMovie!.movie!.genre = value;
  }

  updGenreChanged(value: any) {
    this.updMovie.genreId = value;
  }

  delGenreChanged(value: any) {
    this.delMovie = value;
  }

  delMovieChanged(value: any) {
    this.delMovie = value;
  }

  updMovieChanged(value: any) {
    //using JSON for achieving a deep copy => selection list won't be changed this way
    this.updMovie = JSON.parse(JSON.stringify(value));
  }
}
