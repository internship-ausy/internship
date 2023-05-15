import { Injectable } from '@angular/core';
import { ErrorPopoverComponent } from '../../error-popover/error-popover.component';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActionPopoverComponent } from '../../action-popover/action-popover.component';
import { Subject } from 'rxjs';
import { SuccessPopoverComponent } from '../../success-popover/success-popover.component';
import { ViewDetailsPopoverComponent } from '../../view-details-popover/view-details-popover.component';
import { HistoryLog } from '../../models/historyLog.model';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  actionPopoverEmitter = new Subject<boolean>();

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.openFromComponent(ErrorPopoverComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

      data: {
        message: message,
        action: action,
        snackBar: this.snackBar,
      },
      duration: 3000,
    });
  }
  openSnackBarSuccess(message: string, action: string) {
    this.snackBar.openFromComponent(SuccessPopoverComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

      data: {
        message: message,
        action: action,
        snackBar: this.snackBar,
      },
      duration: 3000,
    });
  }
  openSnackBarAction(
    title: string,
    message: string,
    cancel: string,
    action: string
  ) {
    this.snackBar.openFromComponent(ActionPopoverComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

      data: {
        title: title,
        message: message,
        action: action,
        cancel: cancel,
        snackBar: this.snackBar,
      },
      duration: 100000,
    });
  }

    openSnackBarView(view: HistoryLog) {
    return this.snackBar.openFromComponent(ViewDetailsPopoverComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        firstName: view.fullName.split(' ', 1),
        lastName: this.lastName(view),
        plate: view.plateNumber,
        date: view.date,
        hour: view.date,
        ws: view.workStation,
        carMake: view.carMake,
        carModel: view.carModel,
        estimate: view.estimate,
        description: view.description.replaceAll('; ',';\n-    '),
        snackBar: this.snackBar,
      },
      duration: 1000000,
    });
  }
  lastName(view: HistoryLog) {
    let fullName = view.fullName.split(' ', 2);
    return fullName[1];


  }
}
