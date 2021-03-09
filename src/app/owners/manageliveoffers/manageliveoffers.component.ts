import { Component, OnInit } from '@angular/core';
declare function globleFunctionDeclaration(): any;
import { Api } from "src/app/testing/api";
import { UserProvider } from "src/app/testing/user.provider";

@Component({
  selector: 'app-manageliveoffers',
  templateUrl: './manageliveoffers.component.html',
  styleUrls: ['./manageliveoffers.component.css']
})
export class ManageliveoffersComponent implements OnInit {
  timezone:string
  offerList: any = [];
  constructor(
    private api: Api,
    private userProvider: UserProvider,
  ) { }

  ngOnInit() {
    console.log('live offer page')
    globleFunctionDeclaration();
    this.liveOffersList()
  }
 
  liveOffersList() {
    let url = `offer/offerList?pageNumber=1&limit=10&userId=${this.userProvider.user._id}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.offerList = result.data.docs
      }
    })
  }
}
