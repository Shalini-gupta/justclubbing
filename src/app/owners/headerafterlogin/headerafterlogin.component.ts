import { Component, OnInit } from '@angular/core';
import { UserProvider } from 'src/app/testing/user.provider';

@Component({
  selector: 'app-headerafterlogin',
  templateUrl: './headerafterlogin.component.html',
  styleUrls: ['./headerafterlogin.component.css']
})
export class HeaderafterloginComponent implements OnInit {
  userData:any = {}
  constructor(
    public userProvider: UserProvider,
  ) { }

  ngOnInit() {
    this.userData = this.userProvider.user
  }

}
