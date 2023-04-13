import { Injectable } from '@angular/core';
import { ErrorPopoverComponent } from '../../error-popover/error-popover.component';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

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
        duration: 1000,
      },
      panelClass: 'snackbar-injected-class',  // wiull inject a class in snacbar component
    });
  }
}
