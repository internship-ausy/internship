import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { RegisterUser } from '../shared/models/registerUser.model';
import { Router } from '@angular/router';
import { ChangePassword } from '../shared/models/changePassword.model';
import { FormControl, ValidationErrors } from '@angular/forms';
import { tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
export interface AuthResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'https://localhost:7252/Auth';

  isLoggedIn = false;
  onAuthEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  autLogin() {
    const userData: { username: string; password: string } = JSON.parse(
      localStorage.getItem('userData')!
    );

    if (!userData) {
      return;
    }
  }

  onLogout() {
    this.isLoggedIn = false;
    this.onAuthEvent.emit(this.isLoggedIn);
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  onLogin() {
    this.isLoggedIn = true;
    this.onAuthEvent.emit(this.isLoggedIn);
    this.router.navigate(['/dashboard']);
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://localhost:7252/Auth/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('userData', 'logged in');
        })
      );
  }

  register(user: RegisterUser) {
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/Register',
      {
        FullName: user.fullName,
        Username: user.username,
        Email: user.email,
        Password: user.password,
      }
    );
  }

  // changePassword(user: ChangePassword) {
  //   return this.http.post<AuthResponseData>(
  //     'https://localhost:7252/Auth/ChangePassword',
  //     {
  //       token:'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZhbGVudGluYWxpbjk0QGdtYWlsLmNvbSIsIm5iZiI6MTY4MTIwMDA0MywiZXhwIjoxNjgxMjAwNjQzLCJpYXQiOjE2ODEyMDAwNDN9.IloZmJpcEmaxrz5s17PZGmwscPwf4Xpi1zFttgFILKih_OsJ8q52JKVvS7XGRVls1y-5nLkF17Ub6HRmhkW90A',
  //       Password: user.newPassword,
  //       httpOptions
  //     }
  //   );
  // }

  changePassword(changePassword: ChangePassword) {
    return this.http.put<ChangePassword>(
      `${this.baseUrl}/ChangePassword`,
      changePassword
    );
  }

  passwordNotValid(control: FormControl): ValidationErrors | null {
    let regex =
      '^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[^da-zA-Z]).{8,}$';
    if (!control.value.match(regex)) return { passwordNotValid: true };
    return null;
  }

  passwordRecovery(email: string) {
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/PasswordRecovery',
      {
        Email: email,
      }
    );
  }
}
