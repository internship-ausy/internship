import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HeaderService } from './header.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;

  constructor(
    public translate: TranslateService,
    private headerService: HeaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn;
    this.authService.onAuthEvent.subscribe((e) => (this.loggedIn = e));
  }

  onMenu() {
    this.headerService.onMenu();
  }

  onLogout() {
    this.authService.onLogout();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
