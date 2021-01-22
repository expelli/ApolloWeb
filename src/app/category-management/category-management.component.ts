import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../classes/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'Apollo-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  constructor(private categoryService: CategoryService,  private snackBar: MatSnackBar) {
    this.newCategory= new Category();
    this.delCategory= new Category();
    this.updCategory= new Category();
  }

  categories!: Category[];
  newCategory: Category;
  delCategory: Category;
  updCategory: Category;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => this.categories = res);
  }

  addCategory() {
    this.newCategory.id = undefined;
    this.categoryService.addCategory(this.newCategory).subscribe();
    this.showSnackBar("" + this.newCategory.name + " " + this.newCategory.price, "")
    //this.addForm.reset(this.newGenre); 
  }
  showSnackBar(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  deleteCategory() {
    this.categoryService.deleteCategory(this.delCategory.id).subscribe();
    this.showSnackBar("" + this.delCategory.id, "")
    //this.addForm.reset(this.newGenre);
  }
  updateCategory() {
    this.categoryService.updateCategory(this.updCategory).subscribe();
    this.showSnackBar("" + this.updCategory.id, "")
    //this.addForm.reset(this.newGenre);
  }

  delCategoryChanged(value: any){
    this.delCategory = value;
  }

  updCategoryChanged(value: any){
    this.updCategory = value;
  }

}
