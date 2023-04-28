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
}
