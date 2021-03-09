import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/testing/api';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  privacyPolicy: any = {}
  constructor(
    private api: Api
  ) { 
    this.privacyPolicyData()
  }

  ngOnInit() {
  }

  privacyPolicyData(){
    this.api.get('static/getStaticContentByType?type=PrivacyPolicy').subscribe(result => {
      if (result.status == 200) {
        this.privacyPolicy = result.data
      }
    }, error => {
      console.log(error)
    })
  }


}
