import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorPopoverService } from 'src/app/shared/core/services/error-popover.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {
  recoveryForm: FormGroup;
  loading = false;

  emailNotValid(control: FormControl): ValidationErrors | null {
    let regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    if (!(control.value).match(regex))
      return {'emailNotValid': true}
    return null;
  }

  constructor(
    private authService: AuthService,
    private errorPopoverService: ErrorPopoverService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.recoveryForm.valid) {
      this.loading = true;
      const authObservable = this.authService.password_recovery(
        this.recoveryForm.value.email
      );
      /* authObservable.subscribe({
        next: (res) => {
          this.authService.password_recovery();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });*/
    }
  }

  initForm() {
    this.recoveryForm = new FormGroup({
      'email': new FormControl('', [Validators.required,this.emailNotValid]),
    });
  }
}
