import { CookiesAppService } from './core/services/cookie.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private cookieS: CookiesAppService) {
    this.showCookiesBar = this.cookieS.showConsentCookieBar;
   }

   showCookiesBar = true;

  setCookiesConsentCookie() {
    this.cookieS.setShowConsentCookieBar();
    this.showCookiesBar = false;
  }
}
