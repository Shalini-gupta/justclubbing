import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;

@Component({
  selector: 'app-clubweb',
  templateUrl: './clubweb.component.html',
  styleUrls: ['./clubweb.component.css']
})
export class ClubwebComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }
  

}
