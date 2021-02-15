import { StateService } from './state.service';
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router
} from "@angular/router";

@Injectable({providedIn: 'root'})
export class CheckoutGuard implements CanActivate {
  constructor(private stateS: StateService, private router: Router) {}

  canActivate() {
    if (this.stateS.state.cart.accounts.length == 0) {
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }
}
