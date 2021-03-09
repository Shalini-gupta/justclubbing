import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;
@Component({
  selector: 'app-referafriend',
  templateUrl: './referafriend.component.html',
  styleUrls: ['./referafriend.component.css']
})
export class ReferafriendComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    globleFunctionDeclaration();
  }

}
