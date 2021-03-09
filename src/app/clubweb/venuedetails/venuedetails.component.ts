import { Component, OnInit,AfterViewInit} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var google;
import { OwlOptions } from 'ngx-owl-carousel-o';
declare function globleFunctionDeclaration(): any;
import { RedeemofferComponent } from '../redeemoffer/redeemoffer.component';
import { WrirereviewpopComponent } from '../wrirereviewpop/wrirereviewpop.component';
import { Api } from "src/app/testing/api";
import { UserProvider } from "src/app/testing/user.provider";
import { AmentiesData } from "./../../amenities-data";
import { CityProvider } from "src/app/testing/city.provider";
import { TimeZoneFunction } from '../../testing/timezone'



@Component({
  selector: 'app-venuedetails',
  templateUrl: './venuedetails.component.html',
  styleUrls: ['./venuedetails.component.css'],
})

export class VenuedetailsComponent implements OnInit,AfterViewInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  amentiesData: any = AmentiesData;
  sortAmenities: any = []
  facebook:any
  venueId: string;
  pin: string;
  venueDetail: any = {};
  happyHoursOpeningTime: string;
  happyHoursClosingTime: string;
  rating: string;
  averageRating: number = 0;
  selected :string ='';
  selected1 :string ='';
  setText: string;
  closedDay: any =[]
  timezone: any
  latitude
  longitude

  option: OwlOptions = {
    dots: false, 
    nav: false,  
    loop:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    }, 
  }

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private api: Api,
    private userProvider: UserProvider,
    private _snackBar: MatSnackBar,
    private router: Router,
    public cityProvider: CityProvider,
    ) {}
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.venueId = params['id']
    })
    this.latitude =  localStorage.getItem('currentLat')
    this.longitude =  localStorage.getItem('currentLong')
    this.cityProvider.lat = localStorage.getItem('lat')
    this.cityProvider.long = localStorage.getItem('long')
    let cityLat = this.cityProvider.lat
    let cityLong = this.cityProvider.long
    var timeZone = new TimeZoneFunction(this.api); 
    var callTimeZone = timeZone.getTimeZone(cityLat, cityLong); 
    callTimeZone.then(timeZone => {  
      this.timezone = timeZone
      this.getVenueDetail(this.venueId)
    })
  
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.latitude =  position.coords.latitude
    //     this.longitude =  position.coords.longitude
    //     let cityLat = this.cityProvider.lat
    //     let cityLong = this.cityProvider.long
    //     var timeZone = new TimeZoneFunction(this.api);  
    //     var callTimeZone = timeZone.getTimeZone(cityLat, cityLong); 
    //     callTimeZone.then(timeZone => {  
    //       this.timezone = timeZone
          
    //     })
    //   });
    // }
   
  }
  refreshPage(){
    this.getVenueDetail(this.venueId) 
  }
  checkLogin(){
    this.router.navigate(['/login'])
  }

  getVenueDetail(id){
    let params = new HttpParams()
    params = params.append('venueId', id);
    params = params.append('timezone', this.timezone);
    if(Object.keys(this.userProvider).length !=0 ){
      params = params.append('userId', this.userProvider.user._id);
    } 
    let data = {
      latitude: this.latitude,
      longitude: this.longitude,
    }
    this.api.postParam(`venue/venueDetailForUser`, data, params).subscribe(result => {
      if (result.status == 200) {
        this.venueDetail = result.data
        var d = new Date();
        var n = d.getDay()
        let arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday']
        let openClose = this.venueDetail.venueDetail.venueOpenningAndClosingTime
        for(var i = 0; i < arr.length; i += 1) {
          let index = openClose.findIndex(p => p.day == arr[i])
          if(index == -1){
            this.closedDay.push(arr[i]);
            if(arr[i] == this.day(n)){
              this.selected = arr[i]+' (Closed)'
            }
          }
        }
        this.averageRating = Math.ceil(this.venueDetail.venueDetail.avgRating)
        //show marker of location
        let map = new google.maps.Map(
          document.getElementById('map'), {
            center: { lat: this.venueDetail.venueDetail.latitude? parseFloat(this.venueDetail.venueDetail.latitude): 28.6259, lng: this.venueDetail.venueDetail.longitude? parseFloat(this.venueDetail.venueDetail.longitude): 77.3774}, 
            zoom: 15,
            options: {
              gestureHandling: 'greedy',
            },
        });
        var myLatLng = {lat: parseFloat(this.venueDetail.venueDetail.latitude), lng: parseFloat(this.venueDetail.venueDetail.longitude)};
        let marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
        });
        //show infowindow on marker
        var contentString = `<div style style = 'width:200px;min-height:40px'> <font color="red"> <b> ${this.venueDetail.venueDetail.venueName}</b> </font> <br> <b> ${this.venueDetail.venueDetail.address}</b> </div>`;
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
       });
       infowindow.open(map,marker);
        var d = new Date();
        var n = d.getDay()
        if(this.venueDetail.venueDetail.venueOpenningAndClosingTime.length > 0){
          this.venueDetail.venueDetail.venueOpenningAndClosingTime.forEach(element => {            
            if(element.day == this.day(n)){
              if(element.openingTime && element.closingTime ){
                this.selected = element.day + ' (' + element.openingTime +'-'+element.closingTime +')'
              } else{
                this.selected = this.day(n)+' (Closed)'
              }
            }
          });
        } 
        if(this.venueDetail.venueDetail.happyHoursOpenningAndClossing.length > 0){ 
          this.venueDetail.venueDetail.happyHoursOpenningAndClossing.forEach(element => {
            if(element.day == this.day(n)){
              this.selected1 = element.day + ' (' + element.openingTime +'-'+element.closingTime +')'
            }
            if(element.day != this.day(n)){
              this.selected1 = this.day(n)+' (Closed)'
            }
          });
        }
        this.filterAmenities()
      } else {
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

  rateExp(value){
    this.rating = value
  }

  redeemDialog(id, offer, venue) {
    const dialogRef = this.dialog.open(RedeemofferComponent, {
      data: {id: id, offer: offer, venue: venue}
    });
    dialogRef.afterClosed().subscribe(result1 => {
      if (result1.status == 200) {
        this.getVenueDetail(this.venueId)
      } 
    });
  }

  reviewDialog() {
    if(this.userProvider.user == undefined){
      this.router.navigate(['/usersignin'])
      return
    }
    const dialogRef = this.dialog.open(WrirereviewpopComponent, {
      disableClose: true,
      data: {venueId: this.venueId, rating: this.rating}
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result.status == 200){
        this.sortAmenities = []
        this.getVenueDetail(this.venueId)
      }
    })
  }

  counter(i:number){
    let data=i
    return new Array(Math.round(data))
  }

  ngAfterViewInit(){
    globleFunctionDeclaration();
  }

  addToFavouite(id){
    if(this.userProvider.user == undefined){
      this.router.navigate(['/usersignin'])
      return
    }
    this.api.get(`venue/addToFavoriteVenue?venueId=${id}`).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.getVenueDetail(this.venueId)
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    }, error => {
        console.log({ error })
    })
  }

  filterAmenities(){
    let venueTypeList 
    switch (this.venueDetail.venueDetail.venueType) {
      case 'club&Bars':
      venueTypeList = this.amentiesData['clubAndBars']
        break;
      case 'party&WeddingHalls':
      venueTypeList = this.amentiesData['partyAndWeddingHall']
        break;
      case 'partyBus&LimoHire':
      venueTypeList = this.amentiesData['partyBusAndLimoHire']
        break;
      case 'play&Drinks':
      venueTypeList = this.amentiesData['playAndDrinks']
        break;
      case 'tattoo&Piercing':
      venueTypeList = this.amentiesData['tattooAndPiercing']
        break;
    }
    for(let key in this.venueDetail.venueDetail){
        venueTypeList.map((value)=>{              
          if(value.name == key){
            if(this.venueDetail.venueDetail[key] === true){
              this.sortAmenities.push(value);
            }
          }  
      })
    }
    this.sortAmenities= new Set( this.sortAmenities); 
  }

}
