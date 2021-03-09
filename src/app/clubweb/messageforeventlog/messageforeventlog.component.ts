import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-messageforeventlog',
  templateUrl: './messageforeventlog.component.html',
  styleUrls: ['./messageforeventlog.component.css']
})
export class MessageforeventlogComponent implements OnInit {
  userMessageForm: FormGroup
  userMessageSubmitCheck: boolean = false
  venueId: string
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userMessageForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      message: ['', [Validators.required]],
    })
    this.activatedRoute.params.subscribe(params => {
      this.venueId = params['venueId']
    })
   }

  ngOnInit() {

  }

  userMessageSubmit(){
    this.userMessageSubmitCheck = true
    if(this.userMessageForm.invalid){
      return
    }
    let data = {
      venueId: this.venueId,
      name: this.userMessageForm.value.name,
      email: this.userMessageForm.value.email,
      countryCode: '+91',
      mobileNumber: this.userMessageForm.value.mobileNumber,
      message: this.userMessageForm.value.message,
    }
    this.api.post('venue/sendMessage', data).subscribe(result => { 
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.router.navigate(['/venuesdetail', this.venueId])
      } else {
        this._snackBar.open(result.message, "Error", {
          duration: 5000
        })
      }
    })
  }

}
