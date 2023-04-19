import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/models/registerUser.model';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SuccessPopoverService } from 'src/app/shared/core/services/success-popover.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private successPopoverService: SuccessPopoverService,
    private translate: TranslateService
    ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'fullName': new FormControl('', [Validators.required, this.fullNameNotValid]),
      'username': new FormControl('', [Validators.required, this.usernameNotValid]),
      'email': new FormControl('', [Validators.required, this.authService.emailNotValid]),
      'password': new FormControl('', [Validators.required, this.authService.passwordNotValid]),
      'confirmPassword': new FormControl('', [Validators.required])
    })
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid)
      return;

    this.loading = true;
    let user: RegisterUser = form.value;
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.authService.register(user);

    authObservable.subscribe({
      next: resData => {
        if (resData.success)
        {
          this.loading = false;
          this.successPopoverService.openSnackBar(
            this.translate.instant('register.successPopover'),
            'Ok'
          );
          this.router.navigate(['/login']);
        }
        else this.loading = false;
      }
    })
  }

  fullNameNotValid(control: FormControl): ValidationErrors | null {
    let regex = '^[a-zA-Z\.]{3,} [a-zA-Z]{3,}$';
    if (!(control.value).match(regex))
      return {'fullNameNotValid': true};
    return null;
  }

  usernameNotValid(control: FormControl): ValidationErrors | null {
    let regex = '^[a-zA-Z\.]{3,}(?:[0-9]{0,})$';
    if (!(control.value).match(regex))
      return {'usernameNotValid': true}
    return null;
  }



}

