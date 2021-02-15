import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of, forkJoin } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class CheckoutResolver implements Resolve<any> {
  constructor(private stateS: StateService) {}

  resolve() {
      if(this.stateS.resolversRun && this.stateS.state.countries != null && this.stateS.state.allRegionsAccounts != null) return of(null);
      this.stateS.resolversRun = true;
      this.stateS.loadDbAccountsToState().subscribe();
      this.stateS.laodAllRegionsAccounts().subscribe();
      this.stateS.loadDbRegionsToState().subscribe();

      return forkJoin(
        this.stateS.loadDbCurrencyAndUsersCountryToState(),
        this.stateS.laodCountries()
        );
    }
}