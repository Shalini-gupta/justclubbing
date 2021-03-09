import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  tickettype: string; 
  qty: string;
  price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { tickettype: 'Weekend Pass', qty: 'sddsd', price: '$50'},
  { tickettype: 'Sunday Pass', qty: 'sddsd', price: '$250'},
  { tickettype: 'Child Pass', qty: 'sddsd', price: '$50'},
];

@Component({
  selector: 'app-buttickets',
  templateUrl: './buttickets.component.html',
  styleUrls: ['./buttickets.component.css']
})
export class ButticketsComponent implements OnInit {


  displayedColumns: string[] = ['tickettype', 'qty', 'price'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
