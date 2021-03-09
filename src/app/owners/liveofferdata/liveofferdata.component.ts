import { Component, OnInit,Input,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router'
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-liveofferdata',
  templateUrl: './liveofferdata.component.html',
  styleUrls: ['./liveofferdata.component.css']
})
export class LiveofferdataComponent implements OnInit {
  @Input() data:any;
  @ViewChild('p', {static: true}) p: ElementRef;
  dateTimeZone:any
  constructor(
    private api: Api,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ownerDetail()
  }

  ownerDetail(){
    let url = `venue/particularOwnerVenueDetail?myname=1`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.setTimezone(result.data.venueCity) 
        this.timeStartNew(this.data.fromDate, this.data.toDate, this.data.timeDurationFrom,this.data.timeDurationTill, this.data.offerId)
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

  timeStartNew(fromDate,toDate,timeDurationFrom,timeDurationTill,offerId){
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
        let Difference_In_Time = enddate.getTime() - currentdate.getTime()
        let newTime =  Difference_In_Time/60000
        let dataInSecond = newTime*60
        var x = setInterval(()=>{
          dataInSecond--
          var h = Math.floor(dataInSecond / 3600);
          var m = Math.floor(dataInSecond % 3600 / 60);
          var s = Math.floor(dataInSecond % 3600 % 60);
          var hDisplay = h > 0 ? h + ':': '';
          var mDisplay = m > 0 ? m + ':' : '';
          var sDisplay = s > 0 ? s : '';
          this.p.nativeElement.innerHTML = '<span class="nosprm"> <span>Time Left:</span> '+hDisplay + mDisplay + sDisplay + '</span>';
          if(dataInSecond <=0){
            clearInterval(x);
            this.p.nativeElement.innerHTML = '<span class="nosprm"><span>Time Left:</span> Expired</span>';
            this.change(offerId)
          }
        },1000)
      } else{
        this.p.nativeElement.innerHTML = '<span class="nosprm"><span>Time Left:</span> Expired</span>';
        this.change(offerId)
      }
    } else {
      this.p.nativeElement.innerHTML = '<span class="offexp">This offer will start At: </span>' +timeDurationFrom +' <span>( '+fromDate+' )</span>';
    }
  }

  change(offerId){
    let data = {
      offerId: offerId
    }
    let url = `offer/updateOfferStatus?myname=1`
    this.api.post(url, data).subscribe(result => {
      if (result.status == 200) {
        this.router.navigate(['/owners-manage/manageliveofers'])
      }
    }) 
  }

}
