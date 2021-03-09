import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Api } from "src/app/testing/api";
import { CityProvider } from "src/app/testing/city.provider";
declare function globleFunctionDeclaration(): any;
import { AmentiesData } from "./../../amenities-data";
@Component({
  selector: 'app-managevenues',
  templateUrl: './managevenues.component.html',
  styleUrls: ['./managevenues.component.css']
})
export class ManagevenuesComponent implements OnInit,AfterViewInit {
  amentiesData: any = AmentiesData;
  uploadFileUrls = [];
  venueDetail: any
  selected :string ='';
  selected1 :string ='';
  sortAmenities: any = []
  timezone:any
  closedDay: any =[]
  constructor(
    private api: Api,
    public cityProvider: CityProvider,
    ) {}

  ngOnInit() {
    let timezone = localStorage.getItem('userTimezone')
    this.manageVenueDetail(timezone)
  }

  manageVenueDetail(timezone){
    let url = `venue/particularOwnerVenueDetail?timezone=${timezone}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.venueDetail = result.data
        var d = new Date();
        var n = d.getDay()
        let arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday', 'Saturday']
        let openClose = this.venueDetail.venueOpenningAndClosingTime
        for(var i = 0; i < arr.length; i += 1) {
          let index = openClose.findIndex(p => p.day == arr[i])
          if(index == -1){
            this.closedDay.push(arr[i]);
            if(arr[i] == this.day(n)){
              this.selected = arr[i]+' (Closed)'
            }
          }
        }
        if(this.venueDetail.venueOpenningAndClosingTime.length > 0){
          this.venueDetail.venueOpenningAndClosingTime.forEach(element => {
            if(element.day == this.day(n)){
              if(element.openingTime && element.closingTime ){
                this.selected = element.day + ' (' + element.openingTime +'-'+element.closingTime +')'
              } else{
                this.selected = this.day(n)+' (Closed)'
              }
            }
          });
        } 
        if(this.venueDetail.happyHoursOpenningAndClossing.length > 0){  
          this.venueDetail.happyHoursOpenningAndClossing.forEach(element => {
            if(element.day == this.day(n)){
              if(element.openingTime && element.closingTime ){
                this.selected1 = element.day + ' (' + element.openingTime +'-'+element.closingTime +')'
              } else{
                this.selected1 = this.day(n)+' (Closed)'
              }
            }
          });
        }
        this.filterAmenities()
      }
    }, error => {
      console.log(error)
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

  ngAfterViewInit(){
    globleFunctionDeclaration();
  }

  filterAmenities(){
    let venueTypeList 
    switch (this.venueDetail.venueType) {
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
    for(let key in this.venueDetail){
        venueTypeList.map((value)=>{      
          if(value.name == key){
            if(this.venueDetail[key] === true){
              this.sortAmenities.push(value);
            }
          }  
      })
    }
  }
}
 