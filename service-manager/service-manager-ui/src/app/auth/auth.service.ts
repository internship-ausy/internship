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
  data: any;
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
          localStorage.setItem('userData', res.data);
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

  changePassword(changePassword: ChangePassword) {
    return this.http.put<ChangePassword>(
      `${this.baseUrl}/ChangePassword`,
      {
        token: changePassword.emailToken,
        password: changePassword.newPassword
      }
    );
  }
  
  passwordRecovery(email: string) {
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/PasswordRecovery',
      {
        Email: email,
      }
      );
    }

  passwordNotValid(control: FormControl): ValidationErrors | null {
    let regex =
      '^(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z])(?=.*[^da-zA-Z]).{8,}$';
    if (!control.value.match(regex)) return { passwordNotValid: true };
    return null;
  }

  emailNotValid(control: FormControl): ValidationErrors | null {
    let regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$';
    if (!(control.value).match(regex))
      return {'emailNotValid': true}
    return null;
  }
}
  