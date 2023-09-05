import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  modalTitle: string;
  modalBody: string;
  constructor(@Inject(MAT_DIALOG_DATA)public data: any) {
    this.modalTitle = data.title;
    this.modalBody = data.message;
    console.log(data);
   }

  ngOnInit() {
  }

}
