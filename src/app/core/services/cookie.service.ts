
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesAppService {
  constructor(private cookieService: CookieService) {
    if(this.cookieService.check('abcLeagueConsentForCookies'))  this.showConsentCookieBar = false;

    if(!this.cookieService.getAll()['abcLeagueRand']) {
        this.cookieService.set('abcLeagueRand', String(Math.floor(Math.random()*1300) + Date.now()));
    }

    this.randCookie = this.cookieService.get('abcLeagueRand');
  }

  showConsentCookieBar = true;
  randCookie = '';

  setShowConsentCookieBar() {
    this.cookieService.set( 'abcLeagueConsentForCookies', '1');
  }

}
