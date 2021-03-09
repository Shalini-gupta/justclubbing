import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Api } from "src/app/testing/api";
@Component({
  selector: 'app-wrirereviewpop',
  templateUrl: './wrirereviewpop.component.html',
  styleUrls: ['./wrirereviewpop.component.css']
})
export class WrirereviewpopComponent implements OnInit {
  reviewForm: FormGroup;
  reviewSubmitCheck: boolean = false;
  venueId: string;
  rating: string;
  constructor(
    public dialogRef: MatDialogRef<WrirereviewpopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private api: Api) {
      console.log(data)
    this.venueId = data.venueId
    this.rating = data.rating
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required]],
    })
   }

  ngOnInit() {
  }

  reviewSubmit(){ 
    this.reviewSubmitCheck = true
    if (this.reviewForm.invalid) {
      return
    }
    let data = {
      rating: this.rating,
      comment: this.reviewForm.value.comment,
    }
    this.api.post(`venue/venueRating?venueId=`+this.venueId, data).subscribe(result => {
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
