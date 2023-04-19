import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessPopoverService } from 'src/app/shared/core/services/success-popover.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private successPopoverService: SuccessPopoverService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.recoveryForm.valid)
    {
    let email: string = this.recoveryForm.value.email;
    let authObservable: Observable<AuthResponseData> = this.authService.passwordRecovery(email);
    this.loading = true;

    authObservable.subscribe({
      next: resData => {
        this.loading = false;
        this.successPopoverService.openSnackBar(
          this.translate.instant('recovery.successPopover') + email ,
          'Ok'
        );
      },
      error: (err) => {
        this.loading = false;
      },
    })
  }
}

  initForm() {
    this.recoveryForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.authService.emailNotValid]),
    });
  }
}
