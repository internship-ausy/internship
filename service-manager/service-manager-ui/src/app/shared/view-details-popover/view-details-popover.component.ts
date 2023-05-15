import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-details-popover',
  templateUrl: './view-details-popover.component.html',
  styleUrls: ['./view-details-popover.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ViewDetailsPopoverComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

  closeSnackBar() {
    this.data.snackBar.dismiss();
  }
}
