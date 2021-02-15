import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { forkJoin, Observable, of } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class HomepageResolver implements Resolve<Observable<any>> {
  constructor(private stateS: StateService) {}

  resolve() {
      if(this.stateS.resolversRun && this.stateS.state.accounts != null && this.stateS.state.allRegionsAccounts != null
        && this.stateS.state.currency != null  && this.stateS.state.regions != null) return of(null);
      this.stateS.resolversRun = true;
      this.stateS.laodCountries().subscribe();
      this.stateS.laodAllRegionsAccounts().subscribe();


        return forkJoin(
          this.stateS.loadDbAccountsToState(),
          this.stateS.loadDbCurrencyAndUsersCountryToState(),
          this.stateS.loadDbRegionsToState()
        );
    }
}
