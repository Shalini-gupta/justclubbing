import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';  
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

declare function globleFunctionDeclaration(): any;
import { UserProvider } from "src/app/testing/user.provider";
import { Api } from "src/app/testing/api";
import { CityProvider } from "src/app/testing/city.provider";
import { DataService } from '../../testing/data.service';
import { TimeZoneFunction } from '../../testing/timezone'
import { RedeemofferComponent } from '../redeemoffer/redeemoffer.component';

@Component({
  selector: 'app-liveoffer',
  templateUrl: './liveoffer.component.html',
  styleUrls: ['./liveoffer.component.css']
})
export class LiveofferComponent implements OnInit {
  today: number = Date.now();
  offerList: any = []
  data: any = {
    venueType: 'club&Bars'
  }
  categories: any = []
  message:any
  redeemShow: boolean = false
  callTime=0
  constructor(
    public dialog: MatDialog,
    private api: Api,
    private _snackBar: MatSnackBar,
    private userProvider: UserProvider,
    private cityProvider: CityProvider,
    private dataService: DataService,
    private router: Router) {}

  categoryChange(event) {
    this.data.venueType = event.value
    this.offerByCategory()
  }

  ngOnInit() {
    globleFunctionDeclaration();
    this.venueNameList()
    this.dataService.currentMessage.subscribe(message => {
      this.message = message
      this.callTime=this.callTime+1
      this.message = message
      this.data.latitude = this.message.latitude == null? this.cityProvider.lat: this.message.latitude
      this.data.longitude = this.message.longitude == null? this.cityProvider.long: this.message.longitude
      this.data.venueCity = this.message.venueCity == null? this.cityProvider.city: this.message.venueCity
      this.data.timezone = this.message.timezone == null? this.cityProvider.timezone: this.message.timezone
      // console.log(this.data.latitude , this.data.longitude , this.data.timezone,this.message.apiCall)
      if(this.data.latitude && this.data.longitude && this.data.timezone && this.message.apiCall){
        this.offerByCategory()
      }
    })
  }

  venueNameList(){
    this.api.get(`venue/getVenueCategory`).subscribe(result => {
      if (result.status == 200) {
        this.categories = result.data
      }
    }, error => {
        console.log({ error })
    })
  }

  offerByCategory(){
    
    if(this.userProvider.user != undefined){
      this.data.userId = this.userProvider.user._id
    }
    this.api.post(`offer/offerListByCategory`, this.data).subscribe(result => {
      if (result.status == 200) {
        this.offerList = result.data
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    }, error => {
        console.log({ error })
    })
  }

  redeemDialog(id, offer, venue) {
    if(this.userProvider.user == undefined){
      this.router.navigate(['/usersignin'])
      return
    }
    const dialogRef = this.dialog.open(RedeemofferComponent, {
      data: {id: id, offer: offer, venue: venue}
    });
    dialogRef.afterClosed().subscribe(result1 => {
      if (result1.status == 200) {
        this.offerList()
      }
    });
  }

} 
