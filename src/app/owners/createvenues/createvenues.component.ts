import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $;
declare var google;
declare function globleFunctionDeclaration(): any;
import { VenuetypeinfosComponent } from '../venuetypeinfos/venuetypeinfos.component';
import { AddhappyhoursComponent } from '../addhappyhours/addhappyhours.component';
// import { HappyhoursComponent } from '../happyhours/happyhours.component';
import { UploadsliderimagesComponent } from '../uploadsliderimages/uploadsliderimages.component';
import { TncComponent } from '../tnc/tnc.component';
import { AmentiesData } from "./../../amenities-data";
import { Api } from 'src/app/testing/api';
import { DomSanitizer } from '@angular/platform-browser';
import { CitiesData } from '../../cities-data';
import { TimeZoneFunction } from '../../testing/timezone'

@Component({
  selector: 'app-createvenues',
  templateUrl: './createvenues.component.html',
  styleUrls: ['./createvenues.component.css']
})
export class CreatevenuesComponent implements OnInit {
  citiesData: any = CitiesData.cities;
  uploadFileUrls = [];
  uploadFile: any = [];
  venueForm: FormGroup
  happyHoursData: any = []
  amentiesData: any = AmentiesData
  venueSubmitCheck: boolean = false;
  images: string
  latitude: string
  longitude: string
  currentLat: any
  currentLong: any
  map: any;
  sourcePlaceValue: any;
  happyHourShow: boolean = true;
  openCloseShow: boolean = true;
  categories: any = []
  timezone:any
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar,
    private router: Router,
    public domSanitizer: DomSanitizer
  ) {
    let venueFormControl = {
      venueName: new FormControl('', [Validators.required]),
      venueType: new FormControl('', [Validators.required]),
      venueSuburb: new FormControl('', [Validators.required]),
      venueCity: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      venueState: new FormControl('', [Validators.required]),
      venuePostcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      description: new FormControl('', [Validators.required]),
      // faceBookLink: new FormControl('', [Validators.required, Validators.pattern(reg)]),
      faceBookLink: new FormControl(''),
      instagramLink: new FormControl(''),
      websiteLink: new FormControl(''),
      iAgree: new FormControl(false, [Validators.required]),
      happyHoursCheck: new FormControl('false', [Validators.required]),
      opningAndClosing: this.fb.array([this.createItem()])
      // opningAndClosing: this.fb.array([])
    }
    for (let key in this.amentiesData) {
      for (let i = 0; i < this.amentiesData[key].length; i++) {
        venueFormControl[this.amentiesData[key][i].name] = new FormControl(false, [])
      }
    }
    this.venueForm = this.fb.group(venueFormControl)
  }

  ngOnInit() {
    globleFunctionDeclaration();
    this.venueNameList()
  }

  venueNameList() {
    this.api.get(`venue/getVenueCategory`).subscribe(result => {
      if (result.status == 200) {
        this.categories = result.data
      }
    }, error => {
      console.log({ error })
    })
  }

  createItem(): FormGroup {
    return this.fb.group({
      day: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
    });
  }

  get opningAndClosing() {
    return this.venueForm.get('opningAndClosing') as FormArray;
  }
  addItem(): void {
    this.opningAndClosing.push(this.createItem());

  }

  removeItem(): void {
    if (this.opningAndClosing.length > 1) {
      this.opningAndClosing.removeAt(this.opningAndClosing.length - 1)
    }
  }

  fileDialog(i) {
    const dialogRef = this.dialog.open(UploadsliderimagesComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.uploadFile.push(result)
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadFileUrls.push(this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result)));
        }
        console.log( this.uploadFileUrls)
        reader.readAsDataURL(result);
        $('.jobavails').trigger('to.owl.carousel', this.uploadFile.length);
      }
    });
  }

  removeImage(i) {
    if (this.uploadFileUrls[i] != undefined) {
      this.uploadFileUrls.splice(i, 1);
      this.uploadFile.splice(i, 1);
    }
  }

  infoDialog() {
    this.dialog.open(VenuetypeinfosComponent);
  }

  focusFunction(varids) {
    var sourcePlace = document.getElementById(varids);
    var options = {
      // types: ['(cities)'],
      componentRestrictions: {country: "AU"}
    };
    var autocomplete = new google.maps.places.Autocomplete(sourcePlace, options);
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name', 'formatted_address']);
    var infowindow = new google.maps.InfoWindow();
    autocomplete.addListener('place_changed', () => {
      var placeOne = autocomplete.getPlace();
      if (!placeOne.geometry) {
        window.alert("No details available for input: '" + placeOne.name + "'");
        return;
      }
      var address = '';
      if (placeOne.address_components) {
        address = [
          (placeOne.address_components[0] && placeOne.address_components[0].short_name || ''),
          (placeOne.address_components[1] && placeOne.address_components[1].short_name || ''),
          (placeOne.address_components[2] && placeOne.address_components[2].short_name || '')
        ].join(' ');
      }
      this.latitude = placeOne.geometry.location.lat();
      this.longitude = placeOne.geometry.location.lng();
      this.venueForm.patchValue({
        address: placeOne.formatted_address,
      })
      for (var j = 0; j < placeOne.address_components.length; j++) {
        for (var k = 0; k < placeOne.address_components[j].types.length; k++) {
          if (placeOne.address_components[j].types[k] == "postal_code") {
            this.venueForm.patchValue({
              venuePostcode: placeOne.address_components[j].long_name
            })
          }
          if (placeOne.address_components[j].types[k] == "administrative_area_level_1") {
            this.venueForm.patchValue({
              venueState: placeOne.address_components[j].long_name
            })
          }
          // if (placeOne.address_components[j].types[k] == "locality") {
          //   this.venueForm.patchValue({
          //     venueCity: placeOne.address_components[j].long_name
          //   })
          // }
          if (placeOne.address_components[j].types[k] == "sublocality_level_1") {
            this.venueForm.patchValue({
              venueSuburb: placeOne.address_components[j].long_name
            })
          }
          var timeZone = new TimeZoneFunction(this.api);  
          var callTimeZone = timeZone.getTimeZone(this.latitude, this.longitude); 
          callTimeZone.then(timeZone => {  
            this.timezone = timeZone
          })
        }
      }
    });
  }

  happyHours() {
    const dialogRef = this.dialog.open(AddhappyhoursComponent, {
      disableClose: true,
      data: this.happyHoursData
    });
    $('.cdk-overlay-container').css('z-index', 1)
    dialogRef.afterClosed().subscribe(result => {
      this.happyHoursData = result
      if (result.length == 0) {
        this.happyHoursData = []
        this.venueForm.patchValue({
          happyHoursCheck: 'false'
        })
      }
    });
  }

  tncDialog() {
    this.dialog.open(TncComponent);
  }

  venueSelect(e) {
    if (e.value == 'club&Bars' || e.value == 'play&Drinks') {
      this.openCloseShow = true
      this.happyHourShow = true
      const control = <FormArray>this.venueForm.controls['opningAndClosing'];
      if(control.length == 0){
        this.addItem();
      }
    } else if (e.value == 'party&WeddingHalls' || e.value == 'tattoo&Piercing') {
      this.openCloseShow = true
      this.happyHourShow = false
      const control = <FormArray>this.venueForm.controls['opningAndClosing'];
      if(control.length == 0){
        this.addItem();
      }
    } else if (e.value == 'partyBus&LimoHire') {
      this.openCloseShow = false
      this.happyHourShow = false
      const control = <FormArray>this.venueForm.controls['opningAndClosing'];
      for(let i = control.length-1; i >= 0; i--) {
        control.removeAt(i)
      }
    }
  }

  venueSubmit() {
    $('.cdk-overlay-container').css('z-index', 1000)
    this.venueSubmitCheck = true
    if (this.venueForm.invalid) {
      return
    }
    if (!this.uploadFile.length) {
      this._snackBar.open("Venue Images are required", "Error", {
        duration: 5000
      })
      return
    }
    for(var i=0; i<this.uploadFile.length; i++){
      if (this.uploadFile[i].type !== 'image/jpeg' && this.uploadFile[i].type !== 'image/png' && this.uploadFile[i].type !== 'image/gif' && this.uploadFile[i].type !== 'image/jpg') {
        this._snackBar.open('Image should be in jpeg, jpg, png and gif format', "Error", {
          duration: 5000
        })
        return;
      }
    } 
    if (this.venueForm.value.opningAndClosing.length > 0) { 
      var valueArr = this.venueForm.value.opningAndClosing.map(function(item){ return item.day });
      var isDuplicateDay = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
      });
      if(isDuplicateDay){
        this._snackBar.open("You can not select same day in opening and closing time", "Error", {
          duration: 5000
        })
        return
      }
    }
    let timeOpenClose = []
    if(this.venueForm.value.opningAndClosing.length >0){
      this.venueForm.value.opningAndClosing.forEach(element => {
        let openTime = element.openingTime.split(':')
          let closeTime = element.closingTime.split(':')
          if(openTime[0].length == 1 && closeTime[0].length == 1){
            timeOpenClose.push({
              day: element.day,
              openingTime: '0'+element.openingTime,
              closingTime: '0'+element.closingTime,
            })
          } else if(openTime[0].length == 1){
            timeOpenClose.push({
              day: element.day,
              openingTime: '0'+element.openingTime,
              closingTime: element.closingTime,
            })
          } else if(closeTime[0].length == 1){
            timeOpenClose.push({
              day: element.day,
              openingTime: element.openingTime,
              closingTime: '0'+element.closingTime,
            })
          } else {
            timeOpenClose.push({
              day: element.day,
              openingTime: element.openingTime,
              closingTime: element.closingTime,
            })
          }
      });
    }
    let formData = new FormData()
    formData.append("venueName", this.venueForm.value.venueName)
    formData.append("venueType", this.venueForm.value.venueType)
    formData.append("address", this.venueForm.value.address)
    formData.append("venueCity", this.venueForm.value.venueCity)
    formData.append("venueSuburb", this.venueForm.value.venueSuburb)
    formData.append("venueState", this.venueForm.value.venueState)
    formData.append("venuePostcode", this.venueForm.value.venuePostcode)
    formData.append("latitude", this.latitude)
    formData.append("longitude", this.longitude)
    formData.append("timezone", this.timezone)
    if (this.venueForm.value.opningAndClosing.length > 0) {
      // formData.append("venueOpenningAndClosingTime", JSON.stringify(this.venueForm.value.opningAndClosing))
      formData.append("venueOpenningAndClosingTime", JSON.stringify(timeOpenClose))
    }
    formData.append("happyHoursCheck", this.venueForm.value.happyHoursCheck)
    if (this.happyHoursData.length > 0) {
      formData.append("happyHoursOpenningAndClossing", JSON.stringify(this.happyHoursData))
    }
    formData.append("description", this.venueForm.value.description)
    formData.append("faceBookLink", this.venueForm.value.faceBookLink)
    formData.append("instagramLink", this.venueForm.value.instagramLink)
    formData.append("websiteLink", this.venueForm.value.websiteLink)
    for (let i = 0; i < this.uploadFile.length; i++) {
      formData.append(`venueImage[${i}]`, this.uploadFile[i])
    }
    this.amenitisSwitch(formData)
    this.api.formData("venue/createVenue", formData).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.router.navigate(['/'])
      } else {
        this._snackBar.open(result.message, "Error", {
          duration: 5000
        })
      }
    }, error => {
      console.log({ error })
    })
  }

  amenitisSwitch(formData) {
    switch (this.venueForm.value.venueType) {
      case 'club&Bars':
        for (let i = 0; i < this.amentiesData.clubAndBars.length; i++) {
          formData.append(this.amentiesData.clubAndBars[i].name, this.venueForm.value[this.amentiesData.clubAndBars[i].name])
        }
        break;
      case 'party&WeddingHalls':
        for (let i = 0; i < this.amentiesData.partyAndWeddingHall.length; i++) {
          formData.append(this.amentiesData.partyAndWeddingHall[i].name, this.venueForm.value[this.amentiesData.partyAndWeddingHall[i].name])
        }
        break;
      case 'partyBus&LimoHire':
        for (let i = 0; i < this.amentiesData.partyBusAndLimoHire.length; i++) {
          formData.append(this.amentiesData.partyBusAndLimoHire[i].name, this.venueForm.value[this.amentiesData.partyBusAndLimoHire[i].name])
        }
        break;
      case 'play&Drinks':
        for (let i = 0; i < this.amentiesData.playAndDrinks.length; i++) {
          formData.append(this.amentiesData.playAndDrinks[i].name, this.venueForm.value[this.amentiesData.playAndDrinks[i].name])
        }
        break;
      case 'tattoo&Piercing':
        for (let i = 0; i < this.amentiesData.tattooAndPiercing.length; i++) {
          formData.append(this.amentiesData.tattooAndPiercing[i].name, this.venueForm.value[this.amentiesData.tattooAndPiercing[i].name])
        }
        break;
    }
  }

}
