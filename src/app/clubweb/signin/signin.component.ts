import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';

declare var FB: any;
declare function globleFunctionDeclaration(): any;
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { VerifyscreenComponent } from '../verifyscreen/verifyscreen.component';
import { TermsconditionComponent } from '../termscondition/termscondition.component';
import { PrivacypolicyComponent } from './../privacypolicy/privacypolicy.component';
import { Api } from "src/app/testing/api";
import { UserProvider } from 'src/app/testing/user.provider';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup
  signUpForm: FormGroup
  loginSubmitCheck: boolean = false
  signSubmitCheck: boolean = false;
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: Api,
    private cookieService: CookieService,
    private userProvider: UserProvider,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    })
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      gender: ['', [Validators.required]],
      age: ['', [Validators.required]],
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
    this.fbInt();
    globleFunctionDeclaration();
    this.signInForm.patchValue({
      email: this.cookieService.get('Email'),
      password: this.cookieService.get('Password'),
      rememberMe: this.cookieService.check('CheckBox')
    })
  }
  
  termsCondition(){
    this.dialog.open(TermsconditionComponent);
  }

  privacyPolicy(){
    this.dialog.open(PrivacypolicyComponent);
  }

  forgotPassword() {
    this.dialog.open(ForgetpasswordComponent);
  }

  loginSubmit() {
    this.loginSubmitCheck = true
    if (this.signInForm.invalid) {
      return
    }
    if (this.signInForm.value.rememberMe == false) {
      this.cookieService.delete('Email');
      this.cookieService.delete('Password');
      this.cookieService.delete('CheckBox');
    }
    if (this.signInForm.value.rememberMe == true) {
      this.cookieService.set('Email', this.signInForm.value.email);
      this.cookieService.set('Password', this.signInForm.value.password);
      this.cookieService.set('CheckBox', this.signInForm.value.rememberMe);
    }

    this.api.post('user/userLogin', {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password
    }).subscribe(result => {
      if (result.status == 200) {
        this.userProvider.user = result.data
        let enc = CryptoJS.AES.encrypt(JSON.stringify(result.data), result.data.jwtToken).toString()
        localStorage.setItem("jcu", enc)
        localStorage.setItem("token", result.data.jwtToken)
        this.router.navigate(['/'])
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5000
        })
      }
    }, error => {
      console.log(error)
    })
  }
  signUpSubmit() {
    this.signSubmitCheck = true
    if (this.signUpForm.invalid) {
      return
    }
    let data = {
      firstName: this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      gender: this.signUpForm.value.gender,
      age: this.signUpForm.value.age,
      mobileNumber: this.signUpForm.value.mobileNumber,
      countryCode: '+61',
    }
    this.api.post('user/checkEmailAndMobileAvailability', data).subscribe(result => {
      if (result.status == 200) {
        this._snackBar.open(result.message, "Success", {
          duration: 5000
        })
        const dialogRef = this.dialog.open(VerifyscreenComponent, {
          disableClose: true,
          data: this.signUpForm.value.email
        });
        dialogRef.afterClosed().subscribe(result1 => {
          if(result1.status == 200){
            this.api.post('user/userSignup', data).subscribe(result2 => {
              if (result2.status == 200) {
                this._snackBar.open(result2.message, "Success", {
                  duration: 5000
                })
                this.userProvider.user = result2.data
                let enc = CryptoJS.AES.encrypt(JSON.stringify(result2.data), result2.data.jwtToken).toString()
                localStorage.setItem("jcu", enc)
                localStorage.setItem("token", result2.data.jwtToken)
                this.router.navigate(['/'])
              } else {
                this._snackBar.open(result2.message, 'Error', {
                  duration: 5000
                })
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

  fbInt() {
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '554671921761966',
        cookie: true,
        xfbml: true,
        version: 'v1.0'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  submitLogin() {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api(
          "/" + response.authResponse.userID + '?fields=id,name,email,picture,gender,birthday,age_range',
           (userData) => {
            let socialdata = {
              socialId: userData.id,
              socialType: 'Facebook', 
              email: userData.email,
              name: userData.name,
              profilePic: userData.picture.data.url,
              // age: userData.age_range.min,
              gender: userData.gender,
            }
            this.api.post('user/socialLogin', socialdata).subscribe(result => {
              if (result.status == 200) {
                this._snackBar.open(result.message, "Success", {
                  duration: 5000
                })
                this.userProvider.user = result.data
                let enc = CryptoJS.AES.encrypt(JSON.stringify(result.data), result.data.jwtToken).toString()
                localStorage.setItem("jcu", enc)
                localStorage.setItem("token", result.data.jwtToken)
                localStorage.setItem("socialType", 'Facebook')
                this.router.navigate(['/'])
              } else {
                this._snackBar.open(result.message, 'Error', {
                  duration: 5000
                })
              }
            })
          }
        );
      }
      else {
        console.log('User login failed');
      }
    }, { scope: 'email,user_photos,user_gender,user_birthday,user_age_range', return_scopes: true });
  }

}
