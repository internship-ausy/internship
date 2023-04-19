import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';


@Component({
  selector: 'app-success-popover',
  templateUrl: './success-popover.component.html',
  styleUrls: ['./success-popover.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class SuccessPopoverComponent {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  closeSnackBar() {
    this.data.snackBar.dismiss();
  }
}
