import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Api } from 'src/app/testing/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forclubnotify',
  templateUrl: './forclubnotify.component.html',
  styleUrls: ['./forclubnotify.component.css']
})
export class ForclubnotifyComponent implements OnInit {
  notificationForm: FormGroup
  submitCheck: boolean = false;
  constructor(
    private api: Api,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.notificationForm = this.fb.group({
      message: ['', Validators.required]
    })
   }

  ngOnInit() { 
  }

  onSubmit(){
    this.submitCheck = true
    if(this.notificationForm.invalid){
      return
    }
    let data = {
      message: this.notificationForm.value.message
    }
    this.api.post("user/sendNotificationByOwner", data).subscribe(result => {
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

}
