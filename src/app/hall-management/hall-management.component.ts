import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Genre } from '../classes/genre';
import { Hall } from '../classes/hall';
import { Row } from '../classes/row';
import { HallService } from '../services/hall.service';

@Component({
  selector: 'Apollo-hall-management',
  templateUrl: './hall-management.component.html',
  styleUrls: ['./hall-management.component.css']
})
export class HallManagementComponent implements OnInit {

  constructor(private hallService: HallService) {
    this.initializeData()
  }

  halls!: Hall[]
  newHall!: Hall;
  delHall?: Hall;
  updHall!: Hall;

  initializeData() {
    this.updHall = new Hall;
    this.updHall.rows = [];
    this.delHall = undefined;
    this.newHall = new Hall;
    this.newHall.rows = [];
  }

  loadData() {
    this.hallService.getAllHalls().subscribe(res => { this.halls = res;});
    this.initializeData();
  }

  ngOnInit(): void {
    this.loadData()
  }

  delHallChanged(value: any) {
    this.delHall = value;
  }

  updHallChanged(value: any) {
    this.updHall = JSON.parse(JSON.stringify(value));
  }

  hallUpdated(hall: Hall) {
    this.updHall = hall;
  }

  addRow(val: Hall) {
    var row = new Row;
    row.hallId = val.id;
    row.rowNumber = 1 + val!.rows!.length;
    row.seats = [];
    val.rows?.push(row);
  }

  setHallId(hall: Hall, id: number) {

    hall.id = id;
    if (hall.rows) {
      hall.rows!.forEach(row => {
        row.hallId = id;
        row.seats!.forEach(seat => {
          seat.hallId = id;
        });
      })
    } else {
      hall.rows = [];
    }
  }

  deleteRow(val: Hall) {
    val.rows?.pop();
  }

  addHall() {
    this.hallService.addHall(this.newHall).subscribe(resultHall => {
      this.setHallId(this.newHall, resultHall.id!);
      this.hallService.updateHall(this.newHall).subscribe(res =>  {this.newHall = new Hall; this.loadData();
      return this.newHall;})
    });
  }

  deleteHall() {
    this.hallService.deleteHall(this.delHall!.id).subscribe(res => {this.loadData(); return res;});
  }

  updateHall() {
    this.setHallId(this.updHall, this.updHall.id!)
    this.hallService.updateHall(this.updHall).subscribe();
  }
}
