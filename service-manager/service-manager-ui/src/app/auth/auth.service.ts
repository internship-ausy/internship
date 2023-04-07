import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  onAuthEvent = new EventEmitter<boolean>();

  constructor(private router: Router) {}

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
}
