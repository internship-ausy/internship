import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-error-popover',
  templateUrl: './error-popover.component.html',
  styleUrls: ['./error-popover.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ErrorPopoverComponent {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  closeSnackBar() {
    this.data.snackBar.dismiss();
  }
}
