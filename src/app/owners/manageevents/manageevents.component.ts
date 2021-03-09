import { Component, OnInit } from '@angular/core';
declare var $ 
declare function globleFunctionDeclaration(): any;
@Component({
  selector: 'app-manageevents',
  templateUrl: './manageevents.component.html',
  styleUrls: ['./manageevents.component.css']
})
export class ManageeventsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
