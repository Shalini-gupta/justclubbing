import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $
declare function globleFunctionDeclaration(): any;
import { RulesofuseComponent } from '../rulesofuse/rulesofuse.component';
import { Api } from "src/app/testing/api";

@Component({
  selector: 'app-redeemoffer',
  templateUrl: './redeemoffer.component.html',
  styleUrls: ['./redeemoffer.component.css']
})
export class RedeemofferComponent implements OnInit {
  redeemForm: FormGroup
  offerId: string
  constructor(
    public dialogRef: MatDialogRef<RedeemofferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private api: Api,
    ) {
    this.offerId = data.id
    this.redeemForm = this.fb.group({
      input1: ['', [Validators.required]],
      input2: ['', [Validators.required]],
      input3: ['', [Validators.required]],
      input4: ['', [Validators.required]],
    }) 
  }
  rulesUse() {
    this.dialog.open(RulesofuseComponent);
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

  redeemSubmit(){
    if (this.redeemForm.invalid) {
      return
    }
    let otp = Number(this.redeemForm.value.input1+this.redeemForm.value.input2+this.redeemForm.value.input3+this.redeemForm.value.input4)
    let url= `offer/redeemOffer?offerId=${this.offerId}&pin=${otp}`
    this.api.get(url).subscribe(result => {
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
