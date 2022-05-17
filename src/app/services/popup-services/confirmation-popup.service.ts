import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComfirmationPopupComponent } from 'src/app/popups/confirmation-popup/confirmation-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { DataModel } from 'src/app/models/data-model';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateService {
  data!: DataModel;
  constructor(private dialog: MatDialog) {}

  public openPopup(
    title: string = 'Are you sure?',
    confirmLabel: string = 'Yes',
    cancelLabel: string = 'No'
  ): Observable<void> {
    this.data = new DataModel(title, confirmLabel, cancelLabel);
    let dialogRef = this.dialog.open(ComfirmationPopupComponent, {
      data: this.data,
    });
    return dialogRef.componentInstance.confirmed.asObservable();
  }
}
