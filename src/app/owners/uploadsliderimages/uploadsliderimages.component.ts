import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uploadsliderimages',
  templateUrl: './uploadsliderimages.component.html',
  styleUrls: ['./uploadsliderimages.component.css']
})
export class UploadsliderimagesComponent {
  activeImage:any='https://via.placeholder.com/150'
  constructor(
    public dialogRef: MatDialogRef<UploadsliderimagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  fileUpload(event) {
    if (event.target.files[0]) {
      this.data = event.target.files[0]
      const fr = new FileReader();
      fr.onload = (e: any) => {
        this.activeImage=e.target.result
      };
      fr.readAsDataURL(event.target.files[0]);
    }
    event.target.value = ''
  }
}
