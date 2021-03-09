import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog';
import { UploadsliderimagesComponent } from '../uploadsliderimages/uploadsliderimages.component';
import { FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { TncComponent } from '../tnc/tnc.component';

@Component({
  selector: 'app-createevents',
  templateUrl: './createevents.component.html',
  styleUrls: ['./createevents.component.css']
})
export class CreateeventsComponent implements OnInit {
  eventsForm:FormGroup
  imageSrc: any;
  eventSubmitCheck: boolean = false;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    public domSanitizer: DomSanitizer) {
    this.eventsForm = this.fb.group({
      title: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      openingTime: ['', [Validators.required]],
      closingTime: ['', [Validators.required]],
      address: ['', [Validators.required]],
      ageLimit: ['', [Validators.required]],
      description: ['', [Validators.required]],
      iAgree: [false, [Validators.required]],
      ticketDetails: this.fb.array([this.createItem()]),

    })
  }

  tncDialog() {
    this.dialog.open(TncComponent);
  }

  fileDialog(i) {
    const dialogRef = this.dialog.open(UploadsliderimagesComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(result));
        }
        reader.readAsDataURL(result);
      }
    });
  }

  ngOnInit() {
    globleFunctionDeclaration();
  }
  
  createItem(): FormGroup {
    return this.fb.group({
      ticketType: ['', Validators.required],
      ticketPrice: ['', Validators.required],
      ticketQty: ['', Validators.required],
    });
  }

  get ticketDetails() {
    return this.eventsForm.get('ticketDetails') as FormArray;
  }
  addItem(): void {
    this.ticketDetails.push(this.createItem());
  }

  removeItem(): void {
    if (this.ticketDetails.length > 1) {
      this.ticketDetails.removeAt(this.ticketDetails.length - 1)
    }
  }

  eventSubmit(){
    this.eventSubmitCheck = true
    if (this.eventsForm.invalid) {
      return
    }
    let formData = new FormData()
    formData.append("latitude", localStorage.getItem('currentLat'))
    formData.append("longitude", localStorage.getItem('currentLong'))
    // formData.append("eventImages", localStorage.getItem('currentLong'))
    formData.append("venueId", localStorage.getItem('venueId'))
    formData.append("eventTitle", this.eventsForm.value.title)
    formData.append("eventDate", this.eventsForm.value.eventDate)
    formData.append("eventStartTime", this.eventsForm.value.openingTime)
    formData.append("eventEndTime", this.eventsForm.value.closingTime)
    formData.append("description", this.eventsForm.value.description)
    formData.append("address", this.eventsForm.value.address)
    formData.append("ageLimitEighteenPlus", this.eventsForm.value.ageLimit)
    formData.append("iAgree", this.eventsForm.value.iAgree)
    if (this.ticketDetails.length > 0) {
      formData.append("ticketDetails", JSON.stringify(this.ticketDetails))
    }
  }

}
