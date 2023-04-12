import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { RegisterUser } from '../shared/models/registerUser.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  data: number;
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  onAuthEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private http: HttpClient) {}

  onLogout() {
    this.isLoggedIn = false;
    this.onAuthEvent.emit(this.isLoggedIn);
    this.router.navigate(['/login']);
  }

  onLogin() {
    this.isLoggedIn = true;
    this.onAuthEvent.emit(this.isLoggedIn);
    this.router.navigate(['/dashboard']);
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/login',
      {
        username: username,
        password: password,
      }
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
  
  passwordRecovery(email: string){ 
    return this.http.post<AuthResponseData>(
      'https://localhost:7252/Auth/PasswordRecovery',
      {
        Email: email
      }
    );
  }
}
