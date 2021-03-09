import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;



export interface PeriodicElement {
  tickettype: string;
  qty: string;
  price: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { tickettype: 'Weekend Pass', price: '$50', qty: '100'},
  { tickettype: 'Sunday Pass', price: '$250', qty: '200'},
  { tickettype: 'Child Pass', price: '$50', qty: '300' },
];

@Component({
  selector: 'app-eventsdetails',
  templateUrl: './eventsdetails.component.html',
  styleUrls: ['./eventsdetails.component.css']
})
export class EventsdetailsComponent implements OnInit {

  displayedColumns: string[] = ['tickettype', 'price', 'qty' ];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
