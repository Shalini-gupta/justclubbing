import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;

import { Api } from 'src/app/testing/api';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  Term: any;
  Privacy: any;

  constructor(
    private api: Api
  ) { }

  ngOnInit() {
    globleFunctionDeclaration();

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
