import { Component, OnInit } from '@angular/core';
declare var $
declare function globleFunctionDeclaration(): any;
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';


import { TermsconditionComponent } from '../termscondition/termscondition.component';
import { UserProvider } from "src/app/testing/user.provider";
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-verifyyourid',
  templateUrl: './verifyyourid.component.html',
  styleUrls: ['./verifyyourid.component.css']
})
export class VerifyyouridComponent implements OnInit {

  verifyIdForm: FormGroup
  verifySubmitCheck: boolean = false
  uploadFile: any = []
  userData: any;
  constructor(
    public dialog: MatDialog,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    public api: Api,
    private _snackBar: MatSnackBar
  ) {
    this.verifyIdForm = this.fb.group({
      residential: ['', Validators.required],
      suburb: ['', Validators.required],
      state: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      idNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      idType: ['', Validators.required],
      idCountryOrState: ['', Validators.required],
      idExpiryDate: ['', Validators.required],
      attachedId: ['', Validators.required],
      iAgree: ['', Validators.required],
    })
  }

  ngOnInit() {
    globleFunctionDeclaration();
    this.getUserData()
  }

  getUserData() {
    this.api.get("user/getUserDetails").subscribe(result => {
      if (result.status == 200) {
        this.userData = result.data
        this.verifyIdForm.patchValue({
          residential: this.userData.residentialAddress,
          suburb: this.userData.suburb,
          state: this.userData.state,
          postcode: this.userData.postcode,
          idNumber: this.userData.idNumber,
          idType: this.userData.idType,
          idCountryOrState: this.userData.idCountryOrState,
          idExpiryDate: this.userData.idExpiryDate
        })
      }
    }, error => {
      console.log(error)
    })
  }



  openDialog() {
    const dialogRef = this.dialog.open(TermsconditionComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  selectFile(event) {
    if (event.target.files[0]) {
      this.uploadFile = event.target.files[0];
    }
  }
  verifyIdSubmit() {
    this.verifySubmitCheck = true
    if (this.verifyIdForm.invalid) {
      return
    }
    let formData = new FormData()
    formData.append("userId", this.userProvider.user._id)
    formData.append("residentialAddress", this.verifyIdForm.value.residential)
    formData.append("suburb", this.verifyIdForm.value.suburb)
    formData.append("state", this.verifyIdForm.value.state)
    formData.append("postcode", this.verifyIdForm.value.postcode)
    formData.append("idType", this.verifyIdForm.value.idType)
    formData.append("idNumber", this.verifyIdForm.value.idNumber)
    formData.append("idCountryOrState", this.verifyIdForm.value.idCountryOrState)
    formData.append("idExpiryDate", this.verifyIdForm.value.idExpiryDate)
    formData.append("attachedId", this.uploadFile)
    formData.append("residentialLat", '28.5355')
    formData.append("residentialLong", '77.3910')
    this.api.formData('user/idVerification', formData).subscribe(result => {
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
