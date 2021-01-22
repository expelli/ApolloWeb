import { Input } from '@angular/core';
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

}
