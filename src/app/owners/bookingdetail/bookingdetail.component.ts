import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-bookingdetail',
  templateUrl: './bookingdetail.component.html',
  styleUrls: ['./bookingdetail.component.css']
})
export class BookingdetailComponent implements OnInit {
  messageId: string;
  bookingData: any = {}
  constructor(
    private api: Api,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.messageId = params['messageId']
    })
   }

  ngOnInit() {
    this.bookingDetail()
  }

  bookingDetail(){
    this.api.get(`venue/venueMessageDetail?messageId=${this.messageId}`).subscribe(result => { 
      if (result.status == 200) {
        this.bookingData = result.data
      } else {
        this._snackBar.open(result.message, "Error", {
          duration: 5000
        })
      }
    })
  }

}
