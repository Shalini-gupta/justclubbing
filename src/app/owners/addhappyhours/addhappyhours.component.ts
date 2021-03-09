import { Component, Inject } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-addhappyhours',
  templateUrl: './addhappyhours.component.html',
  styleUrls: ['./addhappyhours.component.css']
})
export class AddhappyhoursComponent {
  happyHours: FormGroup
  venueSubmitCheck: Boolean = false
  constructor(
    public dialogRef: MatDialogRef<AddhappyhoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.happyHours = this.fb.group({
      opningAndClosing: this.fb.array([])
    })
    console.log('==', data)
    this.addItem()
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
