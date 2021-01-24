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

  constructor(private categoryService: CategoryService) {
    this.initializeData();
  }

  newCategory!: Category;
  delCategory?: Category;
  updCategory?: Category;
  //combo box
  categories!: Category[];

  initializeData() {
    this.newCategory = new Category();
    this.delCategory = undefined;
    this.updCategory = new Category();
  }

  loadData() {
    this.categoryService.getAllCategories().subscribe(res => this.categories = res);
    this.initializeData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  addCategory() {
    this.newCategory.id = undefined; //ensures its undefined
    this.categoryService.addCategory(this.newCategory).subscribe(res => { this.loadData(); return res });

  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.delCategory!.id).subscribe(res => { this.loadData(); return res });

  }
  updateCategory() {
    this.categoryService.updateCategory(this.updCategory!).subscribe(res => { this.loadData(); return res });

  }

  // ==== combo box selectionChange

  delCategoryChanged(value: any) {
    this.delCategory = value;
  }

  updCategoryChanged(value: any) {
    this.updCategory = value;
  }

}
