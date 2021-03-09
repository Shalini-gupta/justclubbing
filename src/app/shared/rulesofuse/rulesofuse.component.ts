import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from "src/app/testing/api";

@Component({
  selector: 'app-rulesofuse',
  templateUrl: './rulesofuse.component.html',
  styleUrls: ['./rulesofuse.component.css']
})
export class RulesofuseComponent implements OnInit {
  ruleUse: any = {}
  constructor(
    private api: Api,
    private _snackBar: MatSnackBar,
  ) { 
    this.contentRule()
  }

  ngOnInit() {
  }

  contentRule(){
    this.api.get(`static/getStaticContentByType/?type=ruleOfUSe`).subscribe(result => {
      if (result.status == 200) {
        this.ruleUse = result.data.description
      }
    })

  }

}
