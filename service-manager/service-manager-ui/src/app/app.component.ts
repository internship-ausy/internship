import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ErrorPopoverComponent } from './shared/error-popover/error-popover.component';
import { ErrorService } from './shared/Interceptors/error-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'service-manager-ui';
  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(private translate: TranslateService, private snackBar: MatSnackBar, private errorService: ErrorService) {
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  openSnackBar(errorMesage : string) {
    this.snackBar.openFromComponent(ErrorPopoverComponent, {
      duration: this.durationInSeconds * 10000000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  get401() {
    this.errorService.get401().subscribe();
  }

}
