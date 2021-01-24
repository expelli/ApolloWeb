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
    this.delCategory= undefined;
    this.updCategory= new Category();
  }

  categories!: Category[];
  newCategory: Category;
  delCategory?: Category;
  updCategory?: Category;

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(res => this.categories = res);
  }

  addCategory() {
    this.newCategory.id = undefined;
    this.categoryService.addCategory(this.newCategory).subscribe();
    
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.delCategory!.id).subscribe();
  
  }
  updateCategory() {
    this.categoryService.updateCategory(this.updCategory!).subscribe();
 
  }

  delCategoryChanged(value: any){
    this.delCategory = value;
  }

  updCategoryChanged(value: any){
    this.updCategory = value;
  }

}
