import { Component, OnInit } from '@angular/core';

declare var $
declare function globleFunctionDeclaration(): any;

@Component({
  selector: 'app-ticketsdetailsshw',
  templateUrl: './ticketsdetailsshw.component.html',
  styleUrls: ['./ticketsdetailsshw.component.css']
})
export class TicketsdetailsshwComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
