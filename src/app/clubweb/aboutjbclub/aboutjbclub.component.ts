import { Component, OnInit } from '@angular/core';

import { Api } from 'src/app/testing/api';

@Component({
  selector: 'app-aboutjbclub',
  templateUrl: './aboutjbclub.component.html',
  styleUrls: ['./aboutjbclub.component.css']
})
export class AboutjbclubComponent implements OnInit {
  Term: any;
  Privacy: any;

  constructor(
    private api: Api
  ) { }

  ngOnInit() {
    this.api.get('static/getStaticContent').subscribe(result => {
      if (result.status == 200) {
        result.data.map(value => {
          if (value.type == 'TermCondition') {
            this.Term = value
          } else if (value.type == 'PrivacyPolicy') {
            this.Privacy = value
          }
        })
      }
    }, error => {
      console.log(error)
    })
  }

}
