import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RedeemofferComponent } from '../redeemoffer/redeemoffer.component';
import { DataService } from '../../testing/data.service';
import { CityProvider } from "src/app/testing/city.provider";
import { UserProvider } from "src/app/testing/user.provider";
@Component({
  selector: 'app-redeembutton',
  templateUrl: './redeembutton.component.html',
  styleUrls: ['./redeembutton.component.css']
})
export class RedeembuttonComponent implements OnInit {
  @Input() data:any;
  @Input() data1:any;
  @Output() redeemChange = new EventEmitter();
  redeemStatus: boolean = false
  message:any
  dateTimeZone:any
  constructor(
    public dialog: MatDialog,
    private cityProvider: CityProvider,
    private dataService: DataService,
    private userProvider: UserProvider,
    private router: Router,
  ) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(message => {
      this.message = message
      let city = this.message.venueCity == ''? this.cityProvider.city: this.message.venueCity
      this.setTimezone(city) 
    })
    this.timeStartNew(this.data.fromDate, this.data.toDate, this.data.timeDurationFrom,this.data.timeDurationTill)
  }

  setTimezone(city){
    if(city == 'Sydney'){
      this.setTime(11)
    } else if(city == 'Perth'){
      this.setTime(8)
    } else if(city == 'Melbourne'){
      this.setTime(11)
    } else if(city == 'Brisbane'){
      this.setTime(10)
    } else if(city == 'Gold Coast'){
      this.setTime(10)
    } else if(city == 'Adelaide'){
      this.setTime(10.5)
    } else if(city == 'Noida'){
      this.setTime(5.5)
    }
  }

  setTime(time){
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000*time));
    this.dateTimeZone = new Date(nd)
  }

  timeStartNew(fromDate,toDate,timeDurationFrom,timeDurationTill){
    // let currentdate = new Date()
    let currentdate = new Date(this.dateTimeZone)
    let startdate = new Date(fromDate)
    let enddate = new Date(toDate)
    let time = timeDurationFrom.split(' ')
    let time1 = timeDurationTill.split(' ')
    let openHours
    let openMin
    let endHours
    let endMin
    if (time[1] == 'PM') {
      let dataValue = time[0].split(':')
      if (dataValue[0] == '12') {
        openHours = 12
        openMin = parseInt(dataValue[1])
      } else {
        openHours = 12 + parseInt(dataValue[0])
        openMin = parseInt(dataValue[1])
      }
    } else {
      let dataValue = time[0].split(':')
      openHours = parseInt(dataValue[0])
      openMin  = parseInt(dataValue[1])
    }
    startdate.setHours(openHours)
    startdate.setMinutes(openMin)
    if (time1[1] == 'PM') {
      let dataValue = time1[0].split(':')
      if (dataValue[0] == '12') {
        endHours = 12
        endMin = parseInt(dataValue[1])
      } else {
        endHours = 12 + parseInt(dataValue[0])
        endMin = parseInt(dataValue[1])
      }
    } else {
      let dataValue = time1[0].split(':')
      endHours = parseInt(dataValue[0])
      endMin  = parseInt(dataValue[1])
    }
    enddate.setHours(endHours)
    enddate.setMinutes(endMin)
    if (startdate < currentdate) {
      if(currentdate<enddate){
        this.redeemStatus = true
      } else{
        this.redeemStatus = false
      }
    } else {
      this.redeemStatus = false
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

        this.redeemChange.emit(true);
      }
    });
  }

}
