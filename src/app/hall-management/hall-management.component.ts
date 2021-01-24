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
    this.updHall = new Hall;
    this.updHall.rows = [];
    this.delHall = undefined;
    this.newHall = new Hall;
    this.newHall.rows = [];
  }

  halls!: Hall[]

  newHall!: Hall;
  delHall?: Hall;
  updHall!: Hall;



  ngOnInit(): void {
    this.hallService.getAllHalls().subscribe(res => { this.halls = res; console.log(res) });
  }

  delHallChanged(value: any) {
    this.delHall = value;
  }

  updHallChanged(value: any) {
    this.updHall = JSON.parse(JSON.stringify(value));
  }

  hallUpdated(hall: Hall){
    this.updHall = hall;
  }

  addRow(val: Hall) {
    var row = new Row;
    row.hallId = val.id;
    row.rowNumber = 1 + val!.rows!.length;
    row.seats = [];
    val.rows?.push(row);
  }

  prepareHall(hall: Hall) {
    hall.rows!.forEach(element => {
      element.priceCategoryId = element.priceCategory!.id
    });
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
    //this.prepareHall(this.newHall);
    this.hallService.addHall(this.newHall).subscribe(resultHall => {
      this.setHallId(this.newHall, resultHall.id!);
      this.hallService.updateHall(this.newHall).subscribe(res => this.newHall = new Hall);
      return this.newHall;
    });
  }

  deleteHall() {
    this.hallService.deleteHall(this.delHall!.id).subscribe();
  }

  updateHall() {
    //this.prepareHall(this.updHall);
    this.setHallId(this.updHall, this.updHall.id!)
    this.hallService.updateHall(this.updHall).subscribe();
  }
}
