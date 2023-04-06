import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { RegisterUser } from 'src/app/shared/models/registerUser.model';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fullName = new FormControl('asd asd', [Validators.required, this.fullNameNotValid]);
  username = new FormControl('dsad', [Validators.required, this.usernameNotValid]);
  email = new FormControl('dsad@g', [Validators.required, Validators.email]);
  password = new FormControl('P@rola123', [Validators.required, this.passwordNotValid]);
  confirmPassword = new FormControl('P@rola123', [Validators.required]);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'fullName': this.fullName,
      'username': this.username,
      'email': this.email,
      'password': this.password,
      'confirmPassword': this.confirmPassword
    })
  }

  onSubmit(form: FormGroupDirective) {
    if (!form.valid)
      return;
    console.log(this.registerForm);
    let user: RegisterUser = form.value;
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.authService.register(user);

    authObservable.subscribe({
      next: resData => console.log(resData),
      error: error => console.log(error.error.Message)
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

  passwordNotValid(control: FormControl): ValidationErrors | null {
    let regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).{8,}$';
    if (!(control.value).match(regex))
      return {'passwordNotValid': true}
    return null;
  }

  getFullNameErrorMessage() {
    if (this.fullName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.fullName.hasError('fullNameNotValid') ? 'Not a valid name' : '';
  }

  getUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      return 'You must enter a value';
    }

    return this.username.hasError('usernameNotValid') ? 'Not a valid username' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('passwordNotValid') ? 'Not a valid password' : '';
  }

  getConfirmPasswordErrorMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return this.confirmPassword.hasError('pattern') ? 'The passwords must match!' : '';
  }

}
