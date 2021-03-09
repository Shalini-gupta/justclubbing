import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $
declare function globleFunctionDeclaration(): any;
import {MatDialog} from '@angular/material/dialog';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { Api } from "src/app/testing/api";
import { VerifyscreenComponent } from '../verifyscreen/verifyscreen.component';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetPwdForm: FormGroup
  forgetPwdSubmitCheck: boolean = false
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar) {
    this.forgetPwdForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() {
    globleFunctionDeclaration();
  }

  forgetPwdSubmit(){
    this.forgetPwdSubmitCheck = true
    if (this.forgetPwdForm.invalid) {
      return
    }
    let url = `user/checkEmail?email=${this.forgetPwdForm.value.email}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        //verify otp
        const dialogRef = this.dialog.open(VerifyscreenComponent, {
          disableClose: true,
          data: this.forgetPwdForm.value.email
        });
        dialogRef.afterClosed().subscribe(result1 => {
          if(result1.status == 200){
            //change password 
            const dialogRef = this.dialog.open(ChangepasswordComponent, {
              disableClose: true,
              data: result.data
            });
            dialogRef.afterClosed().subscribe(result2 => {
              if(result2.status == 200){ 
                this.dialog.closeAll()
              }
            })
          }
        });
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    })
  }

}
