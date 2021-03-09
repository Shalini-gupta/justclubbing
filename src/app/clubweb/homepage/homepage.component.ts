import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'; 
import { Router } from '@angular/router';
declare function globleFunctionDeclaration(): any;
import { RedeemofferComponent } from '../redeemoffer/redeemoffer.component';
import { Api } from "src/app/testing/api";
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DataService } from '../../testing/data.service';
import { CityProvider } from "src/app/testing/city.provider";
import { UserProvider } from "src/app/testing/user.provider";
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  venues:any= []
  offers:any= []
  message: any;
  venueEvent: any = []
  searchText: any 
  timezone: any
  happyIcon :any = []
  latitude: any
  longitude: any
  city: any
  callTime=0
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private api: Api,
    private dataService: DataService,
    private cityProvider: CityProvider,
    private userProvider: UserProvider) {} 

    ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      console.log('call time 0')
      this.callTime=this.callTime+1
      this.message = message
      this.latitude = this.message.latitude == null? this.cityProvider.lat: this.message.latitude
      this.longitude = this.message.longitude == null? this.cityProvider.long: this.message.longitude
      this.city = this.message.venueCity == null? this.cityProvider.city: this.message.venueCity
      this.timezone = this.message.timezone == null? this.cityProvider.timezone: this.message.timezone
      if(this.longitude && this.latitude && this.city && this.timezone && this.message.apiCall){
        this.changeCityVenueList()
      }
    })
    globleFunctionDeclaration();
  }

  changeCityVenueList(){
    console.log('call time')
    if (!navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(position => {
      //  let data2 = {
      //       latitude: position.coords.latitude,
      //       longitude: position.coords.longitude,
      //       timezone: this.timezone,
      //       venueCity: this.city 
      //     }
      //   let data = {
      //     latitude: this.latitude,
      //     longitude: this.longitude,
      //     venueCity: this.city,
      //     timezone: this.timezone
      //   }
      //   console.log(data)
      //   forkJoin([this.api.post("venue/venueListForHomeWeb", data), this.api.post("offer/offerListForHomeWeb", data2)]).subscribe(results => {
      //     if (results[0].status == 200) {
      //       this.venues = results[0].data
      //     }
      //     if (results[1].status == 200) {
      //       this.offers = results[1].data
      //     }
      //   });
      // });
    } else{
      let data = {
        latitude: this.latitude,
        longitude: this.longitude,
        venueCity: this.city,
        timezone: this.timezone
      }
      console.log(data)

      forkJoin([this.api.post("venue/venueListForHomeWeb", data), this.api.post("offer/offerListForHomeWeb", data)]).subscribe(results => {
        if (results[0].status == 200) {
          this.venues = results[0].data
        }
        if (results[1].status == 200) {
          this.offers = results[1].data
        }
      });
    }
  }

  offerList(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude =  position.coords.latitude
        this.longitude =  position.coords.longitude
        let data = {
            latitude: this.latitude,
            longitude: this.longitude,
            timezone: this.timezone,
            venueCity: this.city 
          }
          this.api.post("offer/offerListForHomeWeb", data).subscribe(result => {
            if (result.status == 200) {
              this.offers = result.data
            }
          }, error => {
              console.log({ error })
          })
      });
    }
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

  listVenueCheck() {
    this.api.get('user/getUserDetails').subscribe(result => {
      if (result.status == 200) {
        if (result.data.ownerRequest && result.data.ownerAdminVerifyStatus) {
          // send venue dashboard
          this.router.navigate(['/owners-manage/forclubs-and-bars'])
        } else if (result.data.ownerRequest == false && result.data.ownerAdminVerifyStatus == false) {
          // send to create venue
          this.router.navigate(['/owners-manage/createvenues'])
        } else if (result.data.ownerRequest == true && result.data.ownerAdminVerifyStatus == false) {
          // modal
          this.dialog.open(ModalComponent, {
            data: { title: "Pending Status", body: '<p>Your venue verification is under process. Please wait for admin approval</p>' }
          });
        }

      }
    }, error => {
      console.log({ error })
    })
  }

  onSearch(){
    let data = {
      latitude: this.message.latitude == '' ? localStorage.getItem('lat') : this.message.latitude,
      longitude: this.message.longitude == '' ? localStorage.getItem('long') : this.message.longitude,
      venueCity: this.message.venueCity == '' ? localStorage.getItem('city') : this.message.venueCity,
      timezone: this.message.timezone == '' ? localStorage.getItem('timezone') : this.message.timezone,
      search: this.searchText,
    }
    this.api.post("venue/searchForHome", data).subscribe(result => {
      if (result.status == 200) {
        this.venues = result.data
      }
    }, error => {
        console.log({ error })
    })
  }

  day(supp){
    switch (supp) {
      case 0: 
        return 'Sunday'
      case 1: 
        return 'Monday'
      case 2: 
        return 'Tuesday'
      case 3: 
        return 'Wednesday'
      case 4: 
        return 'Thursday'
      case 5: 
        return 'Friday'
      case 6: 
        return 'Saturday'
    }
  }

  updateValue(){
    this.cityProvider.city = localStorage.getItem('city')
    this.cityProvider.lat = localStorage.getItem('lat')
    this.cityProvider.long = localStorage.getItem('long')
    this.cityProvider.timezone = localStorage.getItem('timezone')
  }
}
