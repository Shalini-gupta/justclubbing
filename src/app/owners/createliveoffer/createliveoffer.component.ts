import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $
declare function globleFunctionDeclaration(): any;

import { OffertitlehelpComponent } from '../offertitlehelp/offertitlehelp.component';
import { ExtrainfoshelpComponent } from '../extrainfoshelp/extrainfoshelp.component';
import { RulesofuseComponent } from './../../shared/rulesofuse/rulesofuse.component';
import { Api } from "src/app/testing/api";
import * as moment from 'moment';

@Component({
  selector: 'app-createliveoffer',
  templateUrl: './createliveoffer.component.html',
  styleUrls: ['./createliveoffer.component.css']
})
export class CreateliveofferComponent implements OnInit {
  createOfferForm: FormGroup
  createOfferSubmitCheck: boolean = false
  venueId: string
  timezone:any
  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar,
    private router: Router) {
    this.createOfferForm = this.fb.group({
      offerTitle: ['', [Validators.required, Validators.maxLength(75)]],
      extraInfo: [''],
      offerType: [''],
      noOfVoucher: ['', [Validators.required]],
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
    globleFunctionDeclaration();
    let url = `venue/particularOwnerVenueDetail`
    this.api.get(url).subscribe(result => {
      if (result.status == 200) {
        this.venueId = result.data._id
        this.timezone = result.data.timezone
      }
    })
  }

  rulesUse() {
    this.dialog.open(RulesofuseComponent);
  }

  voucherType(e) {
    if (e.value == 'timeBased') {
      this.createOfferForm.get('fromDate').setValidators([Validators.required]);
      this.createOfferForm.get('toDate').setValidators([Validators.required]);
      this.createOfferForm.get('timeDurationFrom').setValidators([Validators.required]);
      this.createOfferForm.get('timeDurationTill').setValidators([Validators.required]);
      this.createOfferForm.get('noOfVoucher').clearValidators();
      $('.timeBased').show()
      $('.numberBased').hide()
    } else {
      this.createOfferForm.get('noOfVoucher').setValidators([Validators.required]);
      this.createOfferForm.get('fromDate').clearValidators()
      this.createOfferForm.get('toDate').clearValidators()
      this.createOfferForm.get('timeDurationFrom').clearValidators()
      this.createOfferForm.get('timeDurationTill').clearValidators()
      $('.numberBased').show()
      $('.timeBased').hide()
    }
    this.createOfferForm.get('noOfVoucher').updateValueAndValidity();
    this.createOfferForm.get('timeDurationFrom').updateValueAndValidity();
    this.createOfferForm.get('timeDurationTill').updateValueAndValidity();
    this.createOfferForm.get('fromDate').updateValueAndValidity();
    this.createOfferForm.get('toDate').updateValueAndValidity();
  }

  createOfferSubmit() {
    this.createOfferSubmitCheck = true
    if (moment(this.createOfferForm.value.timeDurationFrom, 'hh:mm a') >= moment(this.createOfferForm.value.timeDurationTill, 'hh:mm a')) {
      this.createOfferForm.controls.timeDurationTill.setErrors({ notEquivalent: true })
    } else {
      this.createOfferForm.controls.timeDurationTill.setErrors(null)
    }
    if (this.createOfferForm.invalid) {
      return
    }
    let data: any = {
      timezone: this.timezone,
      venueId: this.venueId,
      offerTitle: this.createOfferForm.value.offerTitle,
      extraInfo: this.createOfferForm.value.extraInfo,
      offerType: this.createOfferForm.value.offerType != '' ? this.createOfferForm.value.offerType : 'numberBased',
    }
    if (data.offerType == 'numberBased') {
      data.vouchersNumber = this.createOfferForm.value.noOfVoucher
    } else {
      data.timeDurationFrom = this.createOfferForm.value.timeDurationFrom
      data.timeDurationTill = this.createOfferForm.value.timeDurationTill
      data.fromDate = moment(this.createOfferForm.value.fromDate).format("YYYY-MM-DD")
      data.toDate = moment(this.createOfferForm.value.toDate).format("YYYY-MM-DD")
    }
    this.api.post("offer/createOffer", data).subscribe(result => {
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
