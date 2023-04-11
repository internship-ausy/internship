import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from '../header.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer', { static: false }) navigation: MatSidenav;
  isExpanded: boolean;
  isLoggedIn: boolean;

  constructor(
    private headerService: HeaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isExpanded = this.headerService.isExpanded;
    this.isLoggedIn = this.authService.isLoggedIn;
    this.headerService.onMenuEvent.subscribe((e) => (this.isExpanded = e));
    this.authService.onAuthEvent.subscribe((e) => {
      this.isLoggedIn = e;

      if (this.isLoggedIn) {
        this.navigation.open();
      } else {
        this.navigation.close();
      }
    });
  }
}
