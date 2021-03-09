import { Component, OnInit } from '@angular/core';
declare var $ 
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog';
import { OffertitlehelpComponent } from '../offertitlehelp/offertitlehelp.component';
import { ExtrainfoshelpComponent } from '../extrainfoshelp/extrainfoshelp.component';

@Component({
  selector: 'app-editliveoffertimebased',
  templateUrl: './editliveoffertimebased.component.html',
  styleUrls: ['./editliveoffertimebased.component.css']
})
export class EditliveoffertimebasedComponent implements OnInit {

  constructor(public dialog: MatDialog) {} 

  openDialog() {
    const dialogRef = this.dialog.open(OffertitlehelpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(ExtrainfoshelpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
