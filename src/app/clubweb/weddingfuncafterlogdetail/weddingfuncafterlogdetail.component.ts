import { Component, OnInit } from '@angular/core';

declare var $
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog'; 
import { RedeemofferComponent } from '../redeemoffer/redeemoffer.component';
import { WrirereviewpopComponent } from '../wrirereviewpop/wrirereviewpop.component';
 
@Component({
  selector: 'app-weddingfuncafterlogdetail',
  templateUrl: './weddingfuncafterlogdetail.component.html',
  styleUrls: ['./weddingfuncafterlogdetail.component.css']
})
export class WeddingfuncafterlogdetailComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(RedeemofferComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 

  openDialog4() {
    const dialogRef = this.dialog.open(WrirereviewpopComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  } 
  
  ngOnInit() {
    globleFunctionDeclaration();
  }
}
