import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { PopoverService } from '../core/services/popover.service';

@Component({
  selector: 'app-action-popover',
  templateUrl: './action-popover.component.html',
  styleUrls: ['./action-popover.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ActionPopoverComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private popoverService: PopoverService) {}

  closeSnackBar() {
    this.popoverService.actionPopoverEmitter.next(false);
    this.data.snackBar.dismiss();
  }
  onClick() {
    this.popoverService.actionPopoverEmitter.next(true);
    this.data.snackBar.dismiss();
  }

}
