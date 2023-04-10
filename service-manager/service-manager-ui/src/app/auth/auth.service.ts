import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
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

  constructor(private router: Router, private httpClient: HttpClient) {}

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
    return this.httpClient.post<AuthResponseData>(
      'https://localhost:7252/Auth/login',
      {
        username: username,
        password: password,
      }
    );
  }
}
