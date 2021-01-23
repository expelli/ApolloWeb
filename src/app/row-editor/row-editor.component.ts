import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class RowEditorComponent implements OnInit, OnChanges {
  @Input() hall!: Hall;
  @Output() hallChange = new EventEmitter<Hall>();

  @Input() update!: boolean;
  constructor(private hallService: HallService, private categoryService: CategoryService) {
    this.hall = new Hall;
  }

  oldId?: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.oldId || (this.oldId &&  this.oldId != this.hall.id)) {
      if (this.update && (this.hall!.id != undefined)) {
        console.log("not null " + this.hall.name);
        this.hallService.getHallDeepById(this.hall!.id!).subscribe(res => {
          this.oldId = res.id;
          this.hall = res;
          this.hallChange.emit(this.hall);
          console.log(this.hall);
        });
      }
    }
  }

  categories!: Category[];

  ngOnInit(): void {
    // if (this.update && (this.hall != undefined) && (this.hall!.id != undefined)) {
    //   this.hallService.getHallDeepById(this.hall!.id!).subscribe(res => {
    //     this.hall = res;
    //     this.hallChange.emit(this.hall);
    //     console.log("init not null " + this.hall!.id);
    //   });
    //   console.log();
    // }
     this.categoryService.getAllCategories().subscribe(res => this.categories = res)
  }

}
