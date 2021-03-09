import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
declare function globleFunctionDeclaration(): any; 
import { OffertitlehelpComponent } from '../offertitlehelp/offertitlehelp.component';
import { ExtrainfoshelpComponent } from '../extrainfoshelp/extrainfoshelp.component';
import { RulesofuseComponent } from './../../shared/rulesofuse/rulesofuse.component';
import { Api } from "src/app/testing/api";
import * as moment from 'moment';

@Component({
  selector: 'app-editliveoffer',
  templateUrl: './editliveoffer.component.html',
  styleUrls: ['./editliveoffer.component.css']
})
export class EditliveofferComponent implements OnInit {
  offerId: string;
  editOfferForm: FormGroup
  editOfferSubmitCheck: boolean = false
  offerDetail: any = {}
  timezone:string;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar,
    private router: Router) {
      this.editOfferForm = this.fb.group({
        status: [''],
        offerTitle: ['', [Validators.required]],
        extraInfo: [''],
        offerType: ['', [Validators.required]],
        noOfVoucher: [''],
        fromDate: [''],
        toDate: [''],
        timeDurationFrom: [''],
        timeDurationTill: [''],
      })
    } 

  openDialog() {
    const dialogRef = this.dialog.open(OffertitlehelpComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(ExtrainfoshelpComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.offerId = params['offerId']
    })
    this.getOffer()
    globleFunctionDeclaration();
    let url = `venue/particularOwnerVenueDetail`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.timezone = result.data.timezone
      }
    })
  }

  getOffer(){
    let url = `offer/offerDeatils?offerId=${this.offerId}`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.offerDetail = result.data
        this.editOfferForm.patchValue({
          offerTitle: this.offerDetail.offerTitle,
          extraInfo: this.offerDetail.extraInfo,
          offerType: this.offerDetail.offerType,
          noOfVoucher: this.offerDetail.vouchersNumber,
          fromDate: this.offerDetail.fromDate,
          toDate: this.offerDetail.toDate,
          timeDurationFrom: this.offerDetail.timeDurationFrom,
          timeDurationTill: this.offerDetail.timeDurationTill,
          status: this.offerDetail.status == 'Active'? true: false
        })
        if (this.offerDetail.offerType == 'timeBased') {
          this.editOfferForm.get('timeDurationFrom').setValidators([Validators.required]);
          this.editOfferForm.get('timeDurationTill').setValidators([Validators.required]);
          this.editOfferForm.get('fromDate').setValidators([Validators.required]);
          this.editOfferForm.get('toDate').setValidators([Validators.required]);
          this.editOfferForm.get('noOfVoucher').clearValidators();
        }
        else {
          this.editOfferForm.get('noOfVoucher').setValidators([Validators.required]);
          this.editOfferForm.get('timeDurationFrom').clearValidators()
          this.editOfferForm.get('timeDurationTill').clearValidators()
          this.editOfferForm.get('fromDate').clearValidators()
          this.editOfferForm.get('toDate').clearValidators()
        }
        this.editOfferForm.get('noOfVoucher').updateValueAndValidity();
        this.editOfferForm.get('timeDurationFrom').updateValueAndValidity();
        this.editOfferForm.get('timeDurationTill').updateValueAndValidity();
        this.editOfferForm.get('fromDate').updateValueAndValidity()
        this.editOfferForm.get('toDate').updateValueAndValidity()
      }
    })
  }

  rulesUse() {
    this.dialog.open(RulesofuseComponent);
  } 

  editOfferSubmit(){
    this.editOfferSubmitCheck = true
    if (moment(this.editOfferForm.value.timeDurationFrom, 'hh:mm a') >= moment(this.editOfferForm.value.timeDurationTill, 'hh:mm a')) {
      this.editOfferForm.controls.timeDurationTill.setErrors({ notEquivalent: true })
    } else {
      this.editOfferForm.controls.timeDurationTill.setErrors(null)
    }
    if (this.editOfferForm.invalid) {
      return
    }
    let data : any = {
      offerId: this.offerId,
      offerTitle: this.editOfferForm.value.offerTitle,
      extraInfo: this.editOfferForm.value.extraInfo,
      offerType: this.editOfferForm.value.offerType,
      status: this.editOfferForm.value.status == true? 'Active': 'Inactive'
    }
    if(this.editOfferForm.value.noOfVoucher != ''){
      data.vouchersNumber= this.editOfferForm.value.noOfVoucher
    }
    if(this.editOfferForm.value.timeDurationFrom != '' && this.editOfferForm.value.timeDurationTill != ''){
      data.timezone = this.timezone
      data.timeDurationFrom= this.editOfferForm.value.timeDurationFrom
      data.timeDurationTill= this.editOfferForm.value.timeDurationTill
      data.fromDate= moment(this.editOfferForm.value.fromDate).format("YYYY-MM-DD")
      data.toDate= moment(this.editOfferForm.value.toDate).format("YYYY-MM-DD")
      this.api.post("offer/editOffer", data).subscribe(result => {
        if (result.status == 200) {
          this._snackBar.open(result.message, "Success", {
            duration: 5000
          })
          this.router.navigate(['/owners-manage/manageliveofers'])
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

}
