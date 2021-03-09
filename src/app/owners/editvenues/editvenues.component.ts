import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

declare var $;
declare var google;
declare function globleFunctionDeclaration(): any;
import { UploadsliderimagesComponent } from '../uploadsliderimages/uploadsliderimages.component';
import { VenuetypeinfosComponent } from '../venuetypeinfos/venuetypeinfos.component';
import { HappyhoursComponent } from '../happyhours/happyhours.component';
import { AmentiesData } from "./../../amenities-data";
import { Api } from "src/app/testing/api";
import { CitiesData } from '../../cities-data';
import { TimeZoneFunction } from '../../testing/timezone'

@Component({
  selector: 'app-editvenues',
  templateUrl: './editvenues.component.html',
  styleUrls: ['./editvenues.component.css']
})
export class EditvenuesComponent implements OnInit {
  citiesData: any = CitiesData.cities;
  editVenueForm: FormGroup;
  amentiesData: any = AmentiesData;
  venueDetail: any;
  map: any;
  venueId: string;
  uploadFileUrls = [];
  uploadFile: any = [];
  latitude: string
  longitude: string
  currentLat: any
  currentLong: any
  happyHoursData: any = []
  venueSubmitCheck: boolean = false;
  sourcePlaceValue: any
  happyHourShow: boolean = true;
  openCloseShow: boolean = true;
  categories: any = []
  selected :string ='';
  timeZone:any
  showHappyHourIcon: boolean = false
  constructor(
    public dialog: MatDialog,
    private api: Api,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public domSanitizer: DomSanitizer) {
    let venueFormControl = {
      venueName: new FormControl('', [Validators.required]),
      venueType: new FormControl(''),
      venueSuburb: new FormControl('', [Validators.required]),
      venueCity: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      venueState: new FormControl('', [Validators.required]),
      venuePostcode: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      description: new FormControl('', [Validators.required]),
      faceBookLink: new FormControl(''),
      instagramLink: new FormControl(''),
      websiteLink: new FormControl(''),
      happyHoursCheck: new FormControl('false', [Validators.required]),
      opningAndClosing: this.fb.array([]),
      latitude: new FormControl('false'),
      longitude: new FormControl('false')
    }
    for (let key in this.amentiesData) {
      for (let i = 0; i < this.amentiesData[key].length; i++) {
        venueFormControl[this.amentiesData[key][i].name] = new FormControl(false, [])
      }
    }
    this.editVenueForm = this.fb.group(venueFormControl)
  }

  openDialog() {
    const dialogRef = this.dialog.open(UploadsliderimagesComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  openDialog2() {
    const dialogRef = this.dialog.open(VenuetypeinfosComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    globleFunctionDeclaration();
    this.activatedRoute.params.subscribe(params => {
      this.venueId = params['venueId']
    })
    this.venueNameList()
    this.venueDetails()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLat = position.coords.latitude
        this.currentLong = position.coords.longitude
      });
    }
    var latlng = new google.maps.LatLng(28.535517, 77.391029);
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 8
    });
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

  venueDetails() {
    let url = `venue/venueDetail?venueId=` + this.venueId
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.venueDetail = result.data
        for (let key in this.amentiesData) {
          for (let i = 0; i < this.amentiesData[key].length; i++) {
            this.editVenueForm['controls'][this.amentiesData[key][i].name].patchValue(this.venueDetail[this.amentiesData[key][i].name]);
          }
        }
        this.venueDetail.venueImages.map(val => {
          this.uploadFileUrls.push(val.image)
        })
        this.venueDetail.venueOpenningAndClosingTime.map(value => this.addItem())
        this.editVenueForm.patchValue({
          venueName: this.venueDetail.venueName,
          venueType: this.venueDetail.venueType,
          address: this.venueDetail.address,
          venueSuburb: this.venueDetail.venueSuburb,
          venuePostcode: this.venueDetail.venuePostcode,
          venueCity: this.venueDetail.venueCity,
          venueState: this.venueDetail.venueState,
          description: this.venueDetail.description,
          faceBookLink: this.venueDetail.faceBookLink,
          instagramLink: this.venueDetail.instagramLink,
          websiteLink: this.venueDetail.websiteLink,
          happyHoursCheck: this.venueDetail.happyHoursCheck ? "true" : "false",
          opningAndClosing: this.venueDetail.venueOpenningAndClosingTime,
          latitude: this.venueDetail.latitude,
          longitude: this.venueDetail.longitude,
        })
        this.happyHoursData = this.venueDetail.happyHoursOpenningAndClossing
        if(this.venueDetail.happyHoursCheck){
          this.showHappyHourIcon = true 
        }
        this.selected =this.venueDetail.venueType
        var timeZone = new TimeZoneFunction(this.api);  
        var callTimeZone = timeZone.getTimeZone(this.editVenueForm.value.latitude, this.editVenueForm.value.longitude); 
        callTimeZone.then(timeZone => {  
          this.timeZone = timeZone 
        })
      }
    }, error => {
      console.log(error)
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
    return this.editVenueForm.get('opningAndClosing') as FormArray;
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
        reader.readAsDataURL(result);

        $('.jobavails').trigger('to.owl.carousel', this.uploadFile.length);
      }
    });
  }

  removeImage(i) {
    if(this.uploadFileUrls[i].length !== undefined){
      let data = {
        venueId: this.venueId,
        image: this.uploadFileUrls[i]
      }
      let url = `venue/deleteVenueImage`
      this.api.post(url, data).subscribe(result => {
        this.uploadFileUrls.splice(i, 1);
        this.uploadFile.splice(i, 1);
        if (result.status == 200) {
          this._snackBar.open(result.message, "Success", {
            duration: 5000
          })
        } else {
          this._snackBar.open(result.message, "Error", {
            duration: 5000
          })
        }
      })
    } else {
      this.uploadFileUrls.splice(i, 1);
      this.uploadFile.splice(i, 1);
    }
  }

  showIcon(isShow){
    this.showHappyHourIcon = isShow 
  }

  focusFunction(varids) {
    var sourcePlace = document.getElementById(varids);
    var options = {
      componentRestrictions: {country: "AU"}
    };
    var autocomplete = new google.maps.places.Autocomplete(sourcePlace, options);
    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name', 'formatted_address']);
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
      this.editVenueForm.patchValue({
        latitude: placeOne.geometry.location.lat(),
        longitude: placeOne.geometry.location.lng(),
        address: placeOne.formatted_address,
      })
      var timeZone = new TimeZoneFunction(this.api);  
      var callTimeZone = timeZone.getTimeZone(this.editVenueForm.value.latitude, this.editVenueForm.value.longitude); 
      callTimeZone.then(timeZone => {  
        this.timeZone = timeZone 
      })
      for (var j = 0; j < placeOne.address_components.length; j++) {
        for (var k = 0; k < placeOne.address_components[j].types.length; k++) {
          if (placeOne.address_components[j].types[k] == "postal_code") {
            this.editVenueForm.patchValue({
              venuePostcode: placeOne.address_components[j].long_name
            })
          }
          if (placeOne.address_components[j].types[k] == "administrative_area_level_1") {
            this.editVenueForm.patchValue({
              venueState: placeOne.address_components[j].long_name
            })
          }
          // if (placeOne.address_components[j].types[k] == "locality") {
          //   this.editVenueForm.patchValue({
          //     venueCity: placeOne.address_components[j].long_name
          //   })
          // }
          if (placeOne.address_components[j].types[k] == "sublocality_level_1") {
            this.editVenueForm.patchValue({
              venueSuburb: placeOne.address_components[j].long_name
            })
          }
        }
      }
    });
  }

  happyHours() {
    const dialogRef = this.dialog.open(HappyhoursComponent, {
      disableClose: true,
      data: { opningAndClosing: this.happyHoursData }
    });
    $('.cdk-overlay-container').css('z-index', 1)
    dialogRef.afterClosed().subscribe(result => {
      this.happyHoursData = result
      if (result.length == 0) {
        this.happyHoursData = []
        this.editVenueForm.patchValue({
          happyHoursCheck: 'false'
        })
      }
    });
  }

  venueSubmit() {
    this.venueSubmitCheck = true
    if (this.editVenueForm.invalid) {
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
    if (this.editVenueForm.value.opningAndClosing.length > 0) { 
      var valueArr = this.editVenueForm.value.opningAndClosing.map(function(item){ return item.day });
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
    if(this.editVenueForm.value.opningAndClosing.length >0){
      this.editVenueForm.value.opningAndClosing.forEach(element => {
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
    formData.append("venueName", this.editVenueForm.value.venueName)
    formData.append("venueType", this.editVenueForm.value.venueType)
    formData.append("address", this.editVenueForm.value.address)
    formData.append("venueCity", this.editVenueForm.value.venueCity)
    formData.append("venueSuburb", this.editVenueForm.value.venueSuburb)
    formData.append("venueState", this.editVenueForm.value.venueState)
    formData.append("venuePostcode", this.editVenueForm.value.venuePostcode)
    formData.append("latitude", this.editVenueForm.value.latitude)
    formData.append("longitude", this.editVenueForm.value.longitude)
    formData.append("timezone", this.timeZone)
    // formData.append("venueOpenningAndClosingTime", JSON.stringify(this.editVenueForm.value.opningAndClosing))
    formData.append("venueOpenningAndClosingTime", JSON.stringify(timeOpenClose))
    formData.append("happyHoursCheck", this.editVenueForm.value.happyHoursCheck)
    if (this.happyHoursData.length > 0 && this.editVenueForm.value.happyHoursCheck == "true") {
      formData.append("happyHoursOpenningAndClossing", JSON.stringify(this.happyHoursData))
    }
    formData.append("description", this.editVenueForm.value.description)
    formData.append("faceBookLink", this.editVenueForm.value.faceBookLink)
    formData.append("instagramLink", this.editVenueForm.value.instagramLink)
    formData.append("websiteLink", this.editVenueForm.value.websiteLink)
    formData.append("venueId", this.venueId)
    for (let i = 0; i < this.uploadFile.length; i++) {
      formData.append(`venueImage[${i}]`, this.uploadFile[i])
    }
    this.amenitisSwitch(formData)
    this.api.formData("venue/editVenue", formData).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.router.navigate(['/owners-manage/forclubs-and-bars'])
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
    switch (this.editVenueForm.value.venueType) {
      case 'club&Bars':
        for (let i = 0; i < this.amentiesData.clubAndBars.length; i++) {
          formData.append(this.amentiesData.clubAndBars[i].name, this.editVenueForm.value[this.amentiesData.clubAndBars[i].name])
        }
        break;
      case 'party&WeddingHalls':
        for (let i = 0; i < this.amentiesData.partyAndWeddingHall.length; i++) {
          formData.append(this.amentiesData.partyAndWeddingHall[i].name, this.editVenueForm.value[this.amentiesData.partyAndWeddingHall[i].name])
        }
        break;
      case 'partyBus&LimoHire':
        for (let i = 0; i < this.amentiesData.partyBusAndLimoHire.length; i++) {
          formData.append(this.amentiesData.partyBusAndLimoHire[i].name, this.editVenueForm.value[this.amentiesData.partyBusAndLimoHire[i].name])
        }
        break;
      case 'play&Drinks':
        for (let i = 0; i < this.amentiesData.playAndDrinks.length; i++) {
          formData.append(this.amentiesData.playAndDrinks[i].name, this.editVenueForm.value[this.amentiesData.playAndDrinks[i].name])
        }
        break;
      case 'tattoo&Piercing':
        for (let i = 0; i < this.amentiesData.tattooAndPiercing.length; i++) {
          formData.append(this.amentiesData.tattooAndPiercing[i].name, this.editVenueForm.value[this.amentiesData.tattooAndPiercing[i].name])
        }
        break;
    }
  }

} 
