import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $
declare function globleFunctionDeclaration(): any;

import { Api } from 'src/app/testing/api';
@Component({
  selector: 'app-helpsupport',
  templateUrl: './helpsupport.component.html',
  styleUrls: ['./helpsupport.component.css']
})
export class HelpsupportComponent implements OnInit {
  helpForm: FormGroup
  helpFormSubmitCheck: boolean = false
  constructor(
    private fb: FormBuilder,
    private api: Api,
    private _snackBar: MatSnackBar

  ) {
    this.helpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      reason: ['', Validators.required],
      message: ['', Validators.required],
    })

  }


  ngOnInit() {
    globleFunctionDeclaration();
  }

  helpSupportSubmit() {
    this.helpFormSubmitCheck = true
    if (this.helpForm.invalid) {
      return
    }

    this.api.post("user/contactUs", this.helpForm.value).subscribe(result => {
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
