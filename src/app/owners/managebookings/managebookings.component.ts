import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from "src/app/testing/api";

@Component({
  selector: 'app-managebookings',
  templateUrl: './managebookings.component.html',
  styleUrls: ['./managebookings.component.css']
})
export class ManagebookingsComponent implements OnInit {
  bookingMsg: any = []
  constructor(
    private api: Api,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.bookingMessage()
  }

  bookingMessage(){
    this.api.get('venue/getMessageList?pageNumber=1&limit=10').subscribe(result => { 
      if (result.status == 200) {
        this.bookingMsg = result.data.docs
      } else {
        this._snackBar.open(result.message, "Error", {
          duration: 5000
        })
      }
    })
  }

}
