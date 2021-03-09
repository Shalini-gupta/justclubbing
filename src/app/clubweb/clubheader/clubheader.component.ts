import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserProvider } from 'src/app/testing/user.provider';
import { Api } from 'src/app/testing/api';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CitiesData } from '../../cities-data';
import { DataService } from '../../testing/data.service';
import { CityProvider } from '../../testing/city.provider';
@Component({
  selector: 'app-clubheader',
  templateUrl: './clubheader.component.html',
  styleUrls: ['./clubheader.component.css']
})
export class ClubheaderComponent implements OnInit {
  citiesData: any = CitiesData.cities;
  selected: string;
  venueCategory;
  distance: any = []
  constructor(
    public userProvider: UserProvider,
    public cityProvider: CityProvider,
    private router: Router,
    private api: Api,
    public dialog: MatDialog,
    private data: DataService
  ) { }

  ngOnInit() {
    this.venueNameList()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('call time headere')
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        this.shortDistance(latitude, longitude)
        let min = Math.min.apply(Math, this.distance.map(function (o) {
          return o.distance;
        }));
        let minArr = this.distance.filter(val => {
          return val.distance == min
        })

        let data = {}
        if (localStorage.getItem('lat') == null && localStorage.getItem('long') == null && localStorage.getItem('city') == null && localStorage.getItem('timezone') == null) {
          data = {
            venueCity: minArr[0].city,
            latitude: minArr[0].lat,
            longitude: minArr[0].long,
            timezone: minArr[0].timezone,
            apiCall:true
          }
          this.selected = minArr[0].city
          if (localStorage.getItem('lat') == null) {
            localStorage.setItem('lat', minArr[0].lat)
          }
          if (localStorage.getItem('long') == null) {
            localStorage.setItem('long', minArr[0].long)
          }
          if (localStorage.getItem('city') == null) {
            localStorage.setItem('city', minArr[0].city)
          }
          if (localStorage.getItem('timezone') == null) {
            localStorage.setItem('timezone', minArr[0].timezone)
          }
        } else {
          data = {
            venueCity: localStorage.getItem('city'),
            latitude: localStorage.getItem('lat'),
            longitude: localStorage.getItem('long'),
            timezone:localStorage.getItem('timezone'),
            apiCall:true
          }
          this.selected = localStorage.getItem('city')
        }
        console.log('call time headere 2')
        this.data.changeMessage(data)
      });
    } else {
      this.handleLocationError(false);
    }
  }

  handleLocationError(browserHasGeolocation) {
    console.log(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.')
  }

  venueNameList() {
    this.api.get(`venue/getVenueCategory`).subscribe(result => {
      if (result.status == 200) {
        this.venueCategory = result.data[0].venueType
      }
    }, error => {
      console.log({ error })
    })
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

  selectCity(name, lat, long, timezone) {
    localStorage.setItem('city', name)
    localStorage.setItem('lat', lat)
    localStorage.setItem('long', long)
    localStorage.setItem('timezone', timezone)
    let data = {
      venueCity: name,
      latitude: lat,
      longitude: long,
      timezone: timezone,
      apiCall:true
    }
    this.data.changeMessage(data)
  }

  shortDistance(lat1, lon1) {
    for (var i = 0; i < this.citiesData.length; i++) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(this.citiesData[i].lat - lat1);  // deg2rad below
      var dLon = deg2rad(this.citiesData[i].long - lon1);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(this.citiesData[i].lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c; // Distance in km
      this.distance.push({
        distance: d,
        city: this.citiesData[i].name,
        lat: this.citiesData[i].lat,
        long: this.citiesData[i].long,
        timezone: this.citiesData[i].timezone,
      })
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180)
    }
  }

  updateValue() {
    this.cityProvider.city = localStorage.getItem('city')
    this.cityProvider.lat = localStorage.getItem('lat')
    this.cityProvider.long = localStorage.getItem('long')
    this.cityProvider.timezone = localStorage.getItem('timezone')
  }

}
