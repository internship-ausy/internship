import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(
    public translate: TranslateService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.loggedIn = this.headerService.isLoggedIn;
    this.headerService.onLogoutEvent.subscribe((e) => (this.loggedIn = e));
  }

  onMenu() {
    this.headerService.onMenu();
  }

  onLogout() {
    this.headerService.onLogout();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
