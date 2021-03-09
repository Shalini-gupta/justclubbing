import { Component, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-happyhours',
  templateUrl: './happyhours.component.html',
  styleUrls: ['./happyhours.component.css']
})
export class HappyhoursComponent {
  happyHours: FormGroup
  venueSubmitCheck: Boolean = false
  constructor(
    public dialogRef: MatDialogRef<HappyhoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.happyHours = this.fb.group({
      opningAndClosing: this.fb.array([])
    })
    if (data.opningAndClosing.length == 0) {
      this.addItem()
    } else if (data.opningAndClosing.length > 0) {
      data.opningAndClosing.map(value => this.addItem())
      this.happyHours.patchValue({
        opningAndClosing: data.opningAndClosing
      })
    }
    else if (data.opningAndClosing.opningAndClosing.length > 0) {
      data.opningAndClosing.opningAndClosing.map(value => this.addItem())
      this.happyHours.patchValue({
        opningAndClosing: data.opningAndClosing.opningAndClosing
      })
    }
  }

  createItem(): FormGroup {
    return this.fb.group({
      day: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
    });
  }

  get opningAndClosing() {
    return this.happyHours.get('opningAndClosing') as FormArray;
  }
  addItem(): void {
    if (this.opningAndClosing.length < 7) {
      this.opningAndClosing.push(this.createItem());
    }
  }
  removeItem(): void {
    if (this.opningAndClosing.length > 1) {
      this.opningAndClosing.removeAt(this.opningAndClosing.length - 1)
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ type: "close", opningAndClosing: this.happyHours.value.opningAndClosing });
  }
  happyHourSubmit() {
    this.venueSubmitCheck = true
    if (this.happyHours.invalid) {
      return
    }
    this.dialogRef.close(this.happyHours.value.opningAndClosing)
  }


}
