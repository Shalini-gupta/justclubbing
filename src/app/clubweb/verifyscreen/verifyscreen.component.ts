import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Api } from "src/app/testing/api";
declare var $;
declare function globleFunctionDeclaration(): any;
@Component({
  selector: 'app-verifyscreen',
  templateUrl: './verifyscreen.component.html',
  styleUrls: ['./verifyscreen.component.css']
})
export class VerifyscreenComponent implements OnInit {
  verifyForm: FormGroup;
  email: string
  constructor(
    public dialogRef: MatDialogRef<VerifyscreenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar,
    ) { 
    this.email = data
    this.verifyForm = this.fb.group({
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
    }) 
  }

  ngOnInit() {
    globleFunctionDeclaration();

    $("input").keyup(function () {
      if (this.value.length == this.maxLength) {
        $(this).next('input').focus();
      }
      else{
        $(this).prev('input').focus();
      }
    });
  }

  verifySubmit(){
    if (this.verifyForm.invalid) {
      return
    }
    let otp = Number(this.verifyForm.value.input1+this.verifyForm.value.input2+this.verifyForm.value.input3+this.verifyForm.value.input4)
    let data = {
      email: this.email,
      otp: otp
    }
    this.api.post('user/otpVerification', data).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.dialogRef.close(result)
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    })
  }
  
  resendOtp(){
    let data = {
      email: this.email,
    }
    this.api.post('user/resendOtp', data).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
        this.verifyForm.reset()
      }
    })
  }

}
