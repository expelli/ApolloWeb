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

  @ViewChild('addForm', {static: true}) addForm!: NgForm;

  constructor(private genreService: GenreService, private snackBar: MatSnackBar) {
    this.newGenre= new Genre(), 
    this.delGenre= new Genre(),  
    this.updGenre= new Genre()
  }

  genres!: Genre[];

  newGenre: Genre;
  delGenre: Genre;
  updGenre: Genre;

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe(res => this.genres = res);
    ;
  }

  addGenre(){
    this.genreService.addGenre(this.newGenre).subscribe();
    this.showSnackBar(""+this.newGenre.name+" "+this.newGenre.id,"")
    //this.addForm.reset(this.newGenre);
  }
  deleteGenre(){
    this.genreService.deleteGenre(this.delGenre.id).subscribe();
    this.showSnackBar(""+this.delGenre.id,"")
    //this.addForm.reset(this.newGenre);
  }
  updateGenre(){
    this.genreService.updateGenre(this.updGenre).subscribe();
    this.showSnackBar(""+this.delGenre.id,"")
    //this.addForm.reset(this.newGenre);
  }

  delGenreChanged(value: any){
    this.delGenre = value;
  }

  updGenreChanged(value: any){
    this.updGenre = value;
  }

  private showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500,
    });
  }

}
