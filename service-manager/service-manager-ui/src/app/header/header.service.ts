import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  isExpanded = true;
  onMenuEvent = new EventEmitter<boolean>();

  onMenu() {
    this.isExpanded = !this.isExpanded;
    this.onMenuEvent.emit(this.isExpanded);
  }
}
