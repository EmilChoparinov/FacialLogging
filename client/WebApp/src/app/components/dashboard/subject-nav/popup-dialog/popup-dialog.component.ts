import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISubject } from '../../../../interfaces/subject';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupDialogComponent>, @Inject(MAT_DIALOG_DATA) public subject: ISubject) { }

  ngOnInit() {
  }

}
