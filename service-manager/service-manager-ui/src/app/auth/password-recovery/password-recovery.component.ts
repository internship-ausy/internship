import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs/internal/Observable';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid)
      return;
    console.log()
    let email: string = form.value.email;
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.authService.passwordRecovery(email);

    authObservable.subscribe({
      next: resData => {
        if (resData.success)
          form.reset();
      }
    })
  }

  initForm() {
    this.recoveryForm = new FormGroup({
      'email': new FormControl('', [Validators.required,this.emailNotValid]),
    });
  }
}
