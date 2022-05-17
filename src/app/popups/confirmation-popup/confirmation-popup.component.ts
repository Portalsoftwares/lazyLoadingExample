import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataModel } from 'src/app/models/data-model';

@Component({
  selector: 'app-can-deactivate-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css'],
})
export class ComfirmationPopupComponent implements OnInit {
  @Output() confirmed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<ComfirmationPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataModel
  ) {}

  ngOnInit() {}

  public confirm(): void {
    this.confirmed.emit();
    this.dialogRef.close();
  }
}
