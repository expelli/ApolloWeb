import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { Category } from '../classes/category';
import { Hall } from '../classes/hall';
import { Row } from '../classes/row';
import { CategoryService } from '../services/category.service';
import { HallService } from '../services/hall.service';

@Component({
  selector: 'Apollo-row-editor',
  templateUrl: './row-editor.component.html',
  styleUrls: ['./row-editor.component.css']
})
export class RowEditorComponent implements OnInit,OnChanges {
  @Input() hall!: Hall;
  @Input() update!: boolean;
  constructor(private hallService: HallService, private categoryService: CategoryService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.update && this.hall != undefined) {
      console.log("not null "+ this.hall.name);
      this.hallService.getHallDeepById(this.hall!.id!).subscribe(res => { this.hall = res; console.log("not null "+this.hall.rows?.length); });
      
    }
  }

  categories!: Category[];

  ngOnInit(): void {
    if (this.update && this.hall != undefined) {
      this.hallService.getHallDeepById(this.hall!.id!).subscribe(res => { this.hall = res; console.log("not null "+this.hall.rows?.length); });
      console.log();
    }
    this.categoryService.getAllCategories().subscribe(res => this.categories = res)
  }

}
