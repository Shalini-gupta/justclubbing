import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare function globleFunctionDeclaration(): any;
import { Api } from "src/app/testing/api";
import { UserProvider } from "src/app/testing/user.provider";
import { CityProvider } from "src/app/testing/city.provider";
import { HttpParams } from '@angular/common/http';
import { AmentiesData } from '../../amenities-data';
import { DataService } from '../../testing/data.service';
@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.css']
})
export class VenuesComponent implements OnInit {
  amentiesData : any = AmentiesData
  pageNumber: number = 1
  categoryName: string;
  venues: any = [];
  venueNames: any = [];
  totalRec: number;
  title: string = ''
  // Data: any = {
  //   venueType: 'club&Bars'
  // }
  Data: any = {}
  sortCategory: any = {}
  categories: any = []
  sortCategories: any = [
    {name: 'Near me', value: 'nearMe'},
    {name: 'Open Now', value: 'openFilter'},
    {name: 'Most Popular', value: 'mostPopulor'},
  ]
  clubAndBars1: any = []
  clubAndBars: any = []
  partyAndWeddingHall: any = []
  partyBusAndLimoHire: any = []
  playAndDrinks: any = []
  tattooAndPiercing: any = []
  clubFilter: boolean = true 
  partyWeddingFilter: boolean = false 
  partyBusFilter: boolean = false 
  playDrinksFilter: boolean = false 
  tattooPiercingFilter: boolean = false 
  venueName: string
  timezone: string
  message: any;
  filterArr: any = [];
  sortDataCategory: any = {};
  callTime=0
  constructor(
    private api: Api,
    private userProvider: UserProvider,
    public cityProvider: CityProvider,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.clubAndBars1 = this.amentiesData['clubAndBars'].slice(0,4)
    globleFunctionDeclaration();
    this.venueNameList()
    this.activatedRoute.params.subscribe(params => {
      this.venueName = params['venuename']
    })
    this.Data.venueType = this.venueName
    this.dataService.currentMessage.subscribe(message => {
      this.message = message 
      this.callTime=this.callTime+1
      let lat = this.message.latitude == null? this.cityProvider.lat: this.message.latitude
      let long = this.message.longitude == null? this.cityProvider.long: this.message.longitude
      let city = this.message.venueCity == null? this.cityProvider.city: this.message.venueCity
      let timezone = this.message.timezone == null? this.cityProvider.timezone: this.message.timezone
      this.Data.timezone = timezone
      this.Data.latitude = lat;
      this.Data.longitude = long;
      this.Data.venueCity = city;
      // if(this.Data.latitude && this.Data.longitude && this.Data.timezone && this.message.apiCall){
      //   console.log('venue call')
      //   this.venueByCategory()
      // }
      if(this.Data.latitude && this.Data.longitude && this.Data.timezone && this.message.apiCall){
        this.venueByCategory()
      }
    })
    // let lat = this.cityProvider.lat == null? -31.953512: this.cityProvider.lat
    // let long = this.cityProvider.long == null? 115.857048: this.cityProvider.long 
    // let timezone = this.cityProvider.timezone == null? 'Australia/Perth': this.cityProvider.timezone
    // this.Data.timezone = timezone
    // this.Data.latitude = lat;
    // this.Data.longitude = long;
    // this.Data.venueCity = this.cityProvider.city == null? 'Perth': this.cityProvider.city;
    // this.venueByCategory()
   
    this.clubAndBars1 = this.clubAndBars1.map(function(el) {
      var o = Object.assign({}, el);
      o.status='false';
      return o;
    })

    // this.clubAndBars = this.amentiesData.clubAndBars.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.status='false';
    //   return o;
    // })
    // this.partyAndWeddingHall = this.amentiesData.partyAndWeddingHall.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.status='false';
    //   return o;
    // })
    // this.partyBusAndLimoHire = this.amentiesData.partyBusAndLimoHire.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.status='false';
    //   return o;
    // })
    // this.playAndDrinks = this.amentiesData.playAndDrinks.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.status='false';
    //   return o;
    // })
    // this.tattooAndPiercing = this.amentiesData.tattooAndPiercing.map(function(el) {
    //   var o = Object.assign({}, el);
    //   o.status='false';
    //   return o;
    // })
  }

  venueNameList(){
    this.api.get(`venue/getVenueCategory`).subscribe(result => {
      if (result.status == 200) {
        this.categories = result.data
        let venuetitle = this.categories.filter(value => {
          return value.venueType == this.venueName
        })
        this.title = venuetitle[0].categoryName
      }
    }, error => {
        console.log({ error })
    })
  }

  categoryChange(event, name) {
    this.Data.venueType = event.value
    this.title = name
    this.venueByCategory()
    // if(event.value == 'party&WeddingHalls'){
    //   this.partyWeddingFilter = true
    //   this.clubFilter = false
    //   this.partyBusFilter = false
    //   this.playDrinksFilter = false
    //   this.tattooPiercingFilter = false
    // }
    // if(event.value == 'partyBus&LimoHire'){
    //   this.partyBusFilter = true
    //   this.partyWeddingFilter = false
    //   this.clubFilter = false
    //   this.playDrinksFilter = false
    //   this.tattooPiercingFilter = false
    // }
    // if(event.value == 'play&Drinks'){
    //   this.playDrinksFilter = true
    //   this.clubFilter = false
    //   this.partyBusFilter = false
    //   this.partyWeddingFilter = false
    //   this.tattooPiercingFilter = false
    // }
    // if(event.value == 'tattoo&Piercing'){
    //   this.tattooPiercingFilter = true
    //   this.clubFilter = false
    //   this.partyBusFilter = false
    //   this.partyWeddingFilter = false
    //   this.playDrinksFilter = false
    // }
    // if(event.value == 'club&Bars'){
    //   this.clubFilter = true
    //   this.tattooPiercingFilter = false
    //   this.partyBusFilter = false
    //   this.partyWeddingFilter = false
    //   this.playDrinksFilter = false
    // }
    if(event.value == 'club&Bars'){
      this.clubFilter = true
    }
    if(event.value == 'party&WeddingHalls' || event.value == 'partyBus&LimoHire' || event.value == 'play&Drinks' || event.value == 'tattoo&Piercing'){
      this.clubFilter = false
    }
  }

  categoryFilter(option, categoryName){
    let params = new HttpParams()
    if(categoryName == 'clubAndBars'){
      let index = this.clubAndBars1.indexOf(option)
      if(option.status == 'false'){
        this.clubAndBars1[index].status = 'true'
      } else {
        this.clubAndBars1[index].status = 'false'
      }
      this.clubAndBars1.map(value => {
        if(value.status == 'true'){
          params = params.append(value.name,'true');
          this.filterArr.push(value.name)
        }
      })
    } 
    params = params.append(Object.keys(this.sortDataCategory).toString(),'true');
    
    // this.sortArr.map(value => {
    //   console.log('cateww', value)
    //   if(value == 'openFilter'){
    //     params = params.append('openFilter','true');
    //     params = params.append('mostPopulor','false');
    //   } 
    //   if(value == 'mostPopulor'){
    //     params = params.append('mostPopulor','true');
    //     params = params.append('openFilter','false')
    //   }
    // })
    // else if(categoryName == 'partyAndWeddingHall'){
    //   let index = this.partyAndWeddingHall.indexOf(option)
    //   if(option.status == 'false'){
    //     this.partyAndWeddingHall[index].status = 'true'
    //   } else {
    //     this.partyAndWeddingHall[index].status = 'false'
    //   }
    //   this.partyAndWeddingHall.map(value => {
    //     if(value.status == 'true'){
    //       params = params.append(value.name,'true');
    //     }
    //   })
    // } else if(categoryName == 'partyBusAndLimoHire'){
    //   let index = this.partyBusAndLimoHire.indexOf(option)
    //   if(option.status == 'false'){
    //     this.partyBusAndLimoHire[index].status = 'true'
    //   } else {
    //     this.partyBusAndLimoHire[index].status = 'false'
    //   }
    //   this.partyBusAndLimoHire.map(value => {
    //     if(value.status == 'true'){
    //       params = params.append(value.name,'true');
    //     }
    //   })
    // } else if(categoryName == 'playAndDrinks'){
    //   let index = this.playAndDrinks.indexOf(option)
    //   if(option.status == 'false'){
    //     this.playAndDrinks[index].status = 'true'
    //   } else {
    //     this.playAndDrinks[index].status = 'false'
    //   }
    //   this.playAndDrinks.map(value => {
    //     if(value.status == 'true'){
    //       params = params.append(value.name,'true');
    //     }
    //   })
    // } else if(categoryName == 'tattooAndPiercing'){
    //   let index = this.tattooAndPiercing.indexOf(option)
    //   if(option.status == 'false'){
    //     this.tattooAndPiercing[index].status = 'true'
    //   } else {
    //     this.tattooAndPiercing[index].status = 'false'
    //   }
    //   this.tattooAndPiercing.map(value => {
    //     if(value.status == 'true'){
    //       params = params.append(value.name,'true');    console.log('++', this.sortDataCategory)

    //     }
    //   })
    // }
    this.api.postParam(`venue/venueListByCategory?pageNumber=${this.pageNumber}&limit=10`, this.Data, params).subscribe(result => {
      if (result.status == 200) {
        this.venues = result.data.result
        this.totalRec = Math.ceil(result.data.total / 10)
      } else {

      }
    }, error => {
        console.log({ error })
    })
  }


  sortChange(event) {
    var uniqueItems = Array.from(new Set(this.filterArr))
    let params = new HttpParams()
    uniqueItems.map(value => {
      params = params.append(value.toString(),'true');
    })
    if(event.value == 'nearMe'){
      delete this.sortCategory.openFilter
      delete this.sortCategory.mostPopulor
    } 
    if(event.value == 'openFilter'){
      this.sortDataCategory = {}
      this.sortCategory.openFilter = 'true'
      delete this.sortCategory.mostPopulor
      this.sortDataCategory.openFilter = 'true'
    } 
    if(event.value == 'mostPopulor'){
      this.sortDataCategory = {}
      this.sortCategory.mostPopulor = 'true'
      delete this.sortCategory.openFilter
      this.sortDataCategory.mostPopulor= 'true'
    }
    this.venueSortByCategory(params)
  }
  
  increasePageNo(pageNo){
    this.pageNumber = pageNo
    this.venueByCategory()
  }

  venueSortByCategory(params){
    if(Object.keys(this.userProvider).length !=0 ){
      this.Data.userId = this.userProvider.user._id
    } else {
      this.Data.userId = undefined
    }
    if(Object.keys(this.sortCategory).length !=0 ){
      params = params.append(Object.keys(this.sortCategory)[0],'true');
    } 
    this.api.postParam(`venue/venueListByCategory?pageNumber=${this.pageNumber}&limit=10`, this.Data, params).subscribe(result => {
      if (result.status == 200) {
        this.venues = result.data.result
        this.totalRec = Math.ceil(result.data.total / 10)
      } else {

      }
    }, error => {
        console.log({ error })
    })
  }

  venueByCategory(){
    if (!navigator.geolocation) { 
      //code heree
    } else {
      if(Object.keys(this.userProvider).length !=0 ){
        this.Data.userId = this.userProvider.user._id
      } else {
        this.Data.userId = undefined
      }
      let params = new HttpParams()
      if(Object.keys(this.sortCategory).length !=0 ){
        params = params.append(Object.keys(this.sortCategory)[0],'true');
      } 
      this.api.postParam(`venue/venueListByCategory?pageNumber=${this.pageNumber}&limit=10`, this.Data, params).subscribe(result => {
        if (result.status == 200) {
          this.venues = result.data.result
          this.totalRec = Math.ceil(result.data.total / 10)
        } else {
  
        }
      }, error => {
          console.log({ error })
      })
    }
    
  }

  counter(i:number){
    return new Array(i)
  }

}
