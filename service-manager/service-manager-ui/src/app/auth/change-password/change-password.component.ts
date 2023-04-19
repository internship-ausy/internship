import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePassword } from 'src/app/shared/models/changePassword.model';
import { AuthService } from '../auth.service';
import { __values } from 'tslib';
import { PopoverService } from 'src/app/shared/core/services/popover.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  emailToReset!: string;
  emailToken!: string;
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private popoverService: PopoverService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        this.authService.passwordNotValid,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.queryParams.subscribe((value) => {
      this.emailToReset = value['email'];
      this.emailToken = value['token'];
      console.log(this.emailToken);
      console.log(this.emailToReset);
    });
  }

  onSubmit(form: FormGroupDirective) {
    if (form.valid) {
    let changePassword: ChangePassword = new ChangePassword(this.emailToken, form.value.password);
      this.authService.changePassword(changePassword).subscribe({
        next: (resData) => {
          this.loading = false;
          this.popoverService.openSnackBar(
            this.translate.instant('changePassword.successPopover'),
            'Ok'
          );
          this.router.navigate(['/login']);
        },
        error: (resData) => {
          this.loading = false;
        },
      });
    }
  }
}
