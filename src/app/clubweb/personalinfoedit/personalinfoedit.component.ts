import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';


import { Api } from "src/app/testing/api";
import { UserProvider } from "src/app/testing/user.provider";

@Component({
  selector: 'app-personalinfoedit',
  templateUrl: './personalinfoedit.component.html',
  styleUrls: ['./personalinfoedit.component.css']
})
export class PersonalinfoeditComponent implements OnInit {
  personalForm: FormGroup
  personalSubmitCheck: boolean = false
  userInfo: any;
  constructor(
    private api: Api,
    private fb: FormBuilder,
    private userProvider: UserProvider,
    private _snackBar: MatSnackBar
  ) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getUserInfo()
  }
  getUserInfo() {
    let url = `user/getUserDetails?userId=${this.userProvider.user._id}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.userInfo = result.data
        this.personalForm.patchValue({
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          email: this.userInfo.email,
          mobileNumber: this.userInfo.mobileNumber,
          gender: this.userInfo.gender,
          age: this.userInfo.age,
        })
      }
    }, error => {
      console.log(error)
    })
  }
  personalFormSubmit() {
    this.personalSubmitCheck = true
    if (this.personalForm.invalid) {
      return
    }
    let data = {
      userId: this.userProvider.user._id,
      firstName: this.personalForm.value.firstName,
      lastName: this.personalForm.value.lastName,
      email: this.personalForm.value.email,
      gender: this.personalForm.value.gender,
      age: this.personalForm.value.age,
    }
    this.api.post('user/userUpdateDetails', data).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        });
      }
    }, error => {
      console.log(error)
    })

  }

}
