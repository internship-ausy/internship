import { Injectable } from '@angular/core';
import { ErrorPopoverComponent } from '../../error-popover/error-popover.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ActionPopoverComponent } from '../../action-popover/action-popover.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorPopoverService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';



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

  openSnackBarAction(title: string, message: string, cancel: string, action: string) {
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
}
