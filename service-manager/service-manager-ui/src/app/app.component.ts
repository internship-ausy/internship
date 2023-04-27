import { Component } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { PopoverService } from './shared/core/services/popover.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'service-manager-ui';
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private translate: TranslateService,
    private popoverService: PopoverService,
  ) {
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  openSnackBar(message: string, action: string) {
    this.popoverService.openSnackBar(message, action);
  }


}
