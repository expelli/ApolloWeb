import { Component, OnInit } from '@angular/core';
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
    this.delHall = new Hall; 
    this.newHall = new Hall;
    this.newHall.rows = [];
  }

  halls!: Hall[]

  newHall!: Hall;
  delHall!: Hall;
  updHall!: Hall;



  ngOnInit(): void {
    this.hallService.getAllHalls().subscribe(res => {this.halls = res; console.log(res)});
  }

  delHallChanged(value: any){
    this.delHall = value;
  }

  updHallChanged(value: any){
    console.log("updHall.Id: ",value.Id)
    this.updHall = value;
  }

  addRow(val: Hall){
    var row = new Row;
    row.hallId = val.id;
    row.rowNumber = 1 + val!.rows!.length;
    row.seats = [];
    val.rows?.push(row);
  }

  prepareHall(hall: Hall){
    hall.rows
  }

  deleteRow(val: Hall){
    val.rows?.pop();
  }

  addHall(){

  }

  deleteHall(){
    this.hallService.deleteHall(this.delHall.id).subscribe();
  }

  updateHall(){

  }
}
