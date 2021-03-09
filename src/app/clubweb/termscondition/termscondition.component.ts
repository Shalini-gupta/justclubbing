import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/testing/api';

@Component({
  selector: 'app-termscondition',
  templateUrl: './termscondition.component.html',
  styleUrls: ['./termscondition.component.css']
})
export class TermsconditionComponent implements OnInit {
  TermCondition: any;

  constructor(
    private api: Api
  ) { 
    this.tncData()
  }

  ngOnInit() {
  }

  tncData(){
    this.api.get('static/getStaticContentByType?type=TermCondition').subscribe(result => {
      if (result.status == 200) {
        this.TermCondition = result.data
      }
    }, error => {
      console.log(error)
    })
  }

}
