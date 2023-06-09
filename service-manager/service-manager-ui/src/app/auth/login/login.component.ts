import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { TranslateService } from '@ngx-translate/core';


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
    private popoverService: PopoverService,
    private translate: TranslateService

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
          this.popoverService.openSnackBarSuccess(
            this.translate.instant('login.successPopover') + this.loginForm.value.username,
            'Ok'
          );
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
