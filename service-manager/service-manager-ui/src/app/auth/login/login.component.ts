import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorPopoverService } from 'src/app/shared/core/services/error-popover.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private authService: AuthService,
    private errorPopoverService: ErrorPopoverService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      const authObservable = this.authService.login(
        this.loginForm.value.username,
        this.loginForm.value.password
      );
      authObservable.subscribe({
        next: (res) => {
          this.authService.onLogin();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
