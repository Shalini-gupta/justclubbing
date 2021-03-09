import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
