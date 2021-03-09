import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;

@Component({
  selector: 'app-sequrityhirerequest',
  templateUrl: './sequrityhirerequest.component.html',
  styleUrls: ['./sequrityhirerequest.component.css']
})
export class SequrityhirerequestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
