import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header-translation',
  templateUrl: './header-translation.component.html',
  styleUrls: ['./header-translation.component.css'],
})
export class HeaderTranslationComponent {
  constructor(public translate: TranslateService) {
    translate.setDefaultLang('ro');
    translate.use('ro');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
