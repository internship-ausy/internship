import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isExpanded = true;
  isLoggedIn = false;
  onMenuEvent = new EventEmitter<boolean>();
  onLogoutEvent = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onMenu() {
    this.isExpanded = !this.isExpanded;
    this.onMenuEvent.emit(this.isExpanded);
  }

  onLogout() {
    this.isLoggedIn = !this.isLoggedIn;
    this.router.navigate(['/login']);
    this.onLogoutEvent.emit(this.isLoggedIn);
  }
}
