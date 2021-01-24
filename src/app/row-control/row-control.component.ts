import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Category } from '../classes/category';
import { Row } from '../classes/row';
import { Seat } from '../classes/seat';

@Component({
  selector: 'Apollo-row-control',
  templateUrl: './row-control.component.html',
  styleUrls: ['./row-control.component.css']
})
export class RowControlComponent implements OnInit {
  @Input() row!: Row;
  @Input() categories!: Category[];
  @Input() hallId!: number;
  @Output() categoryChanged = new EventEmitter<Row>();
  constructor() { }

  ngOnInit(): void {
  }

  SeatNrChanged(value: any) {
    this.row.seats = []
    for (let i = 1; i <= value; i++) {
      let new_seat = new Seat;
      new_seat.hallId = this.hallId;
      new_seat.rowId = this.row.rowNumber;
      new_seat.seatNumber = i;
      this.row.seats!.push(new_seat)
    }
  }

  categoryChange(value: any) {
    this.row.priceCategoryId = value;
    this.categoryChanged.emit(this.row);
  }

}
