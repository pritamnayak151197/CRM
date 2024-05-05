import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-screen',
  templateUrl: './create-new-screen.component.html',
  styleUrls: ['./create-new-screen.component.css']
})
export class CreateNewScreenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateNewScreenComponent>) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

}
