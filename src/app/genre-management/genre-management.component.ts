import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Genre } from '../classes/genre';
import { GenreService } from '../services/genre.service';

@Component({
  selector: 'Apollo-genre-management',
  templateUrl: './genre-management.component.html',
  styleUrls: ['./genre-management.component.css']
})
export class GenreManagementComponent implements OnInit {

  @ViewChild('addForm', { static: true }) addForm!: NgForm;

  constructor(private genreService: GenreService) {
    this.initializeData();
  }

  //members 
  newGenre!: Genre;
  delGenre?: Genre;
  updGenre!: Genre;
  //combo box
  genres!: Genre[];

  initializeData() {
    this.newGenre = new Genre(),
    this.updGenre = new Genre()
    this.delGenre = undefined;
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.initializeData;
    this.genreService.getAllGenres().subscribe(res => this.genres = res);
  }

  addGenre() {
    this.genreService.addGenre(this.newGenre).subscribe(res => this.loadData()) //reload and reset inputs);
    
  }

  deleteGenre() {
    this.genreService.deleteGenre(this.delGenre!.id).subscribe(res => this.loadData()) //reload and reset inputs);
    
  }
  updateGenre() {
    this.genreService.updateGenre(this.updGenre).subscribe(res => this.loadData()) //reload and reset inputs);
  }

  // combo box selectionChange

  delGenreChanged(value: any) {
    this.delGenre = value;
  }

  updGenreChanged(value: any) {
    //using JSON for achieving a deep copy => selection list won't be changed this way
    this.updGenre = JSON.parse(JSON.stringify(value));
  }

}
