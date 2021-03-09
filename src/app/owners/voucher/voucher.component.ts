import { Component, OnInit, Input } from '@angular/core';
import { Api } from "src/app/testing/api";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  @Input() data: any
  voucherStatus: boolean = false
  dateTimeZone:any
  constructor(
    private api: Api,
  ) { }

  ngOnInit() {
    this.ownerDetail()
    // this.timeStartNew(this.data.fromDate, this.data.toDate, this.data.timeDurationFrom,this.data.timeDurationTill)
  }

  ownerDetail(){
    console.log('neww')
    let url = `venue/particularOwnerVenueDetail?myname=1`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.setTimezone(result.data.venueCity) 
        this.timeStartNew(this.data.fromDate, this.data.toDate, this.data.timeDurationFrom,this.data.timeDurationTill)
      }
    })
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
        this.voucherStatus = true
      } else{
        this.voucherStatus = true
      }
    } else {
      this.voucherStatus = false
    }
  }

}
