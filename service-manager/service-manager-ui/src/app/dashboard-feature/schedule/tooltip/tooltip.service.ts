import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarTooltip } from 'src/app/shared/models/snackbarTooltip.model';
import { TooltipComponent } from './tooltip.component';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar) {}

  openSnackBarTooltip(tooltip: SnackbarTooltip) {
    return this.snackBar.openFromComponent(TooltipComponent, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: {
        firstName: tooltip.firstName,
        lastName: tooltip.lastName,
        plate: tooltip.plateNumber,
        carMake: tooltip.carMake,
        carModel: tooltip.carModel,
        date: tooltip.date,
        hour: tooltip.hour,
        ws: tooltip.workStation,
        estimate: tooltip.estimate,
        description: tooltip.description,
        snackBar: this.snackBar,
      },
      duration: 100000,
    });
  }

}
