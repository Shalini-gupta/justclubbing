import { Component, OnInit } from '@angular/core';
declare var $ 
declare function globleFunctionDeclaration(): any;

import {MatDialog} from '@angular/material/dialog';
import { TncComponent } from '../tnc/tnc.component';


@Component({
  selector: 'app-licenseqctrl',
  templateUrl: './licenseqctrl.component.html',
  styleUrls: ['./licenseqctrl.component.css']
})
export class LicenseqctrlComponent implements OnInit {

  constructor(public dialog: MatDialog) {} 

  openDialog() {
    const dialogRef = this.dialog.open(TncComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
