import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Api } from "src/app/testing/api";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  changePwdForm: FormGroup
  changePwdSubmitCheck: boolean = false
  userId: string
  constructor(
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar) {
      this.userId = data
      console.log(data)
      this.changePwdForm = this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') })
     }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
      return (group: FormGroup) => {
        let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({ notEquivalent: true })
        }
        else {
          return passwordConfirmationInput.setErrors(null);
        }
      }
    }

  ngOnInit() {
  }

  changePwdSubmit(){
    this.changePwdSubmitCheck = true
    if (this.changePwdForm.invalid) {
      return
    }
    let data = {
      password: this.changePwdForm.value.password,
      userId: this.userId
    }
    this.api.post('user/forgotPassword', data).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        this.dialogRef.close(result)
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
        this.dialogRef.close(result)
      }
    })
  }

}
