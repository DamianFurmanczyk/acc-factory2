import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cookie-consent-bar',
  templateUrl: './cookie-consent-bar.component.html',
  styleUrls: ['./cookie-consent-bar.component.scss']
})
export class CookieConsentBarComponent {
  @Output() dismissCookiesBarAndSetCookie = new EventEmitter();
  triggerTransition;
  showAlert = true;

  constructor() { }

  transitionAndDismiss() {
    this.triggerTransition = true;
    setTimeout(() => {
      this.showAlert = false;
      this.dismissCookiesBarAndSetCookie.emit();
    }, 400);
  }

}
