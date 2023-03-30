import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn: boolean = true;

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  onMenu() {

  }

  onLogout() {

  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
