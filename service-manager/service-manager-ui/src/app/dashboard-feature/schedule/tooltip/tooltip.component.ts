import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {

  }

  closeSnackBar() {
    this.data.snackBar.dismiss();
  }
}
