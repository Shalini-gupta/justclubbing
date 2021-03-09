import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RulesofuseComponent } from './../../shared/rulesofuse/rulesofuse.component';

declare var $
declare function globleFunctionDeclaration(): any;
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-viewliveoffer',
  templateUrl: './viewliveoffer.component.html',
  styleUrls: ['./viewliveoffer.component.css']
})
export class ViewliveofferComponent implements OnInit {
  offerId: string;
  offerDetail: any = {}
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private api: Api,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.offerId = params['offerId']
    })
    globleFunctionDeclaration();
    this.getoffer()
  }

  getoffer(){
    let url = `offer/offerDeatils?offerId=${this.offerId}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.offerDetail = result.data
        console.log(this.offerDetail)
      }
    })
  }

  rulesUse() {
    this.dialog.open(RulesofuseComponent);
  } 

}
