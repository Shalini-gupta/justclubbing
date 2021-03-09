import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';

import { Api } from 'src/app/testing/api';

@Component({
    selector: 'app-news-subscribe',
    templateUrl: './news-subscribe.component.html'
})

export class NewsSubscribeComponent implements OnInit {
    newsForm: FormGroup
    newsFormSubmitCheck: boolean = false
    constructor(
        private fb: FormBuilder,
        private api: Api,
        private _snackBar: MatSnackBar

    ) {
        this.newsForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        })
    }

    ngOnInit() { }

    newsSubmit() {
        this.newsFormSubmitCheck = true
        if (this.newsForm.invalid) {
            return
        }
        this.api.post("user/subscribe", this.newsForm.value).subscribe(result => {
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