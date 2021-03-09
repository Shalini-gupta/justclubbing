import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog';
import { ButticketsComponent } from '../buttickets/buttickets.component';

@Component({
  selector: 'app-eventsdetail',
  templateUrl: './eventsdetail.component.html',
  styleUrls: ['./eventsdetail.component.css']
})
export class EventsdetailComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(ButticketsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
