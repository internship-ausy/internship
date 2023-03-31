import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from '../header.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  @ViewChild('drawer', { static: false }) navigation: MatSidenav;
  isExpanded: boolean;
  isLoggedIn: boolean;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    this.isExpanded = this.headerService.isExpanded;
    this.isLoggedIn = this.headerService.isLoggedIn;
    this.headerService.onMenuEvent.subscribe((e) => (this.isExpanded = e));
    this.headerService.onLogoutEvent.subscribe((e) => {
      this.isLoggedIn = e;
      this.navigation.close();
    });
  }
}
