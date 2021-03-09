import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Api } from 'src/app/testing/api';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { UserProvider } from 'src/app/testing/user.provider';

@Component({
  selector: 'app-webfooter',
  templateUrl: './webfooter.component.html',
  styleUrls: ['./webfooter.component.css']
})
export class WebfooterComponent implements OnInit {

  constructor( 
    private router: Router,
    private api: Api,
    public dialog: MatDialog,
    public userProvider: UserProvider) { }

  ngOnInit() {
   
  }

  listVenueCheck() {
    if(this.userProvider.user == undefined){
      this.router.navigate(['/usersignin'])
    } 
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

}
