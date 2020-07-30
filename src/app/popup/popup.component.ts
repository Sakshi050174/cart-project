import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface DialogData {
  selectedItems: [], subTotal: 0.00,
  total: 0.00,
  vatTax: {percent: 0.00},
  discount : {percent: 0.00},
  totalItems : 0.00

}
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})

export class PopupComponent implements OnInit {
  date = new Date();
  constructor(private dialog: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData ) { }
  closePopup(): void{
    this.dialog.close();
  }

  ngOnInit(): void {
  }

}
