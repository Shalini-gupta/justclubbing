import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
declare function globleFunctionDeclaration(): any;
import { UserProvider } from "src/app/testing/user.provider";
import { Api } from "src/app/testing/api";
import { CityProvider } from "src/app/testing/city.provider";
import { TimeZoneFunction } from '../../testing/timezone'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  favourites:any = []
  timezone:any
  constructor(
    private api: Api,
    private userProvider: UserProvider,
    public cityProvider: CityProvider,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    globleFunctionDeclaration();
    this.favouriteList()
  }

  favouriteList(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let latitude =  position.coords.latitude
        let longitude =  position.coords.longitude
        var timeZone = new TimeZoneFunction(this.api);  
        var callTimeZone = timeZone.getTimeZone(position.coords.latitude, position.coords.longitude); 
        callTimeZone.then(timeZone => {  
          this.timezone = timeZone
          let data : any = {
            latitude: latitude,
            longitude: longitude,
            venueCity: this.cityProvider.city,
            timezone: this.timezone,
            venueType: 'All',
          }
          if(Object.keys(this.userProvider).length !=0 ){
            data.userId = this.userProvider.user._id
          } 
          this.api.post(`venue/favouriteVenueList`, data).subscribe(result => {
            if (result.status == 200) {
              this.favourites = result.data
            } 
          }, error => {
              console.log({ error })
          })
        })
      });
    }
 
  }

  addToFavouite(id){
    this.api.get(`venue/addToFavoriteVenue?venueId=${id}`).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.favouriteList()
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    }, error => {
        console.log({ error })
    })
  }

}
