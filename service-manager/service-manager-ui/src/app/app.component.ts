import { Component } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ErrorService } from './shared/core/services/error-server.service';
import { ErrorPopoverService } from './shared/core/services/error-popover.service';

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
    private errorPopoverService: ErrorPopoverService,
    private errorService: ErrorService
  ) {
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  openSnackBar(message: string, action: string) {
    this.errorPopoverService.openSnackBar(message, action);
  }

  get401() {
    this.errorService.get401().subscribe();
  }
}
