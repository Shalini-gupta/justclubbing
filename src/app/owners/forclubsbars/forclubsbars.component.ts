import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/testing/api';

@Component({
  selector: 'app-forclubsbars',
  templateUrl: './forclubsbars.component.html',
  styleUrls: ['./forclubsbars.component.css']
})
export class ForclubsbarsComponent implements OnInit {
  userDetail:any ={}
  constructor(
    private api: Api,
  ) { }

  ngOnInit() {
    this.api.get('user/getUserDetails').subscribe(result => {
      if (result.status == 200) {
        this.userDetail = result.data
        localStorage.setItem('userTimezone',this.userDetail.timezone)
        localStorage.setItem('venueId',this.userDetail.venueId)
      }
    })
  }

}
