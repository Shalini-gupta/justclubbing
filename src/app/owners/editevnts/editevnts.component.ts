import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog';
import { UploadsliderimagesComponent } from '../uploadsliderimages/uploadsliderimages.component';
@Component({
  selector: 'app-editevnts',
  templateUrl: './editevnts.component.html',
  styleUrls: ['./editevnts.component.css']
})
export class EditevntsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(UploadsliderimagesComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
