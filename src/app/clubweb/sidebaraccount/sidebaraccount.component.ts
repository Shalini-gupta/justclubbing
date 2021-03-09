import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';

import { UserProvider } from 'src/app/testing/user.provider';
import { Api } from 'src/app/testing/api';
import { ModalComponent } from "src/app/shared/modal/modal.component";
declare var FB: any;

@Component({
  selector: 'app-sidebaraccount',
  templateUrl: './sidebaraccount.component.html',
  styleUrls: ['./sidebaraccount.component.css']
})
export class SidebaraccountComponent implements OnInit {
  constructor(
    public userProvider: UserProvider,
    private router: Router,
    private api: Api,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fbInt();
  }

  selectFile(event) {
    if (event.target.files[0]) {
      let formData = new FormData()
      formData.append("profilePic", event.target.files[0])

      this.api.formData('user/updateProfilePic', formData).subscribe(result => {
        console.log(result)
        if (result.status == 200) {
          event.target.value = ''
          this._snackBar.open(result.message, "Success", {
            duration: 5000
          });
          const bytes = CryptoJS.AES.decrypt(localStorage.getItem("jcu"), localStorage.getItem('token'));
          let user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
          user.profilePic = result.data.profilePic
          user.profileCompletePer = result.data.profileCompletePer
          user.firstName = result.data.firstName
          user.lastName = result.data.lastName
          let enc = CryptoJS.AES.encrypt(JSON.stringify(user), localStorage.getItem('token')).toString()
          localStorage.setItem("jcu", enc)
          this.userProvider.user.profilePic = result.data.profilePic
          this.userProvider.user.profileCompletePer = result.data.profileCompletePer
          this.userProvider.user.firstName = result.data.firstName
          this.userProvider.user.lastName = result.data.lastName
        }
      }, error => {
        console.log(error)
      })
    }
  }

  listVenueCheck() {
    this.api.get('user/getUserDetails').subscribe(result => {
      if (result.status == 200) {
        if (result.data.ownerRequest && result.data.ownerAdminVerifyStatus) {
          // send venue dashboard
          this.router.navigate(['/owners-manage/forclubs-and-bars'])
        } else if (result.data.ownerRequest == false && result.data.ownerAdminVerifyStatus == false) {
          // send to create venue
          this.router.navigate(['/owners-manage/createvenues'])
        } else if (result.data.ownerRequest == true && result.data.ownerAdminVerifyStatus == false) {
          // modal
          this.dialog.open(ModalComponent, {
            data: { title: "Pending Status", body: '<p>Your venue verification is under process. Please wait for admin approval</p>' }
          });
        }

      }
    }, error => {
      console.log({ error })
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

  logOut() {
    this.userProvider.user = null
    if(localStorage.getItem('socialType') == 'Facebook'){
      FB.logout(function(response) {
        console.log(response)
        // user is now logged out
      });
    }
    localStorage.clear();
    this.router.navigate(['/'])
  }
}
