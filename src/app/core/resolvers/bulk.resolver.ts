import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { Observable, of, forkJoin } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class BulkResolver implements Resolve<Observable<any>> {
  constructor(private stateS: StateService) {}

  resolve() {
    if(this.stateS.resolversRun && this.stateS.state.currency != null) return of(null);
    this.stateS.resolversRun = true;
      this.stateS.loadDbRegionsToState().subscribe();
      this.stateS.loadDbAccountsToState().subscribe();
      this.stateS.laodCountries().subscribe();
      
      return forkJoin(
        this.stateS.loadDbCurrencyAndUsersCountryToState(),
        this.stateS.laodAllRegionsAccounts()
      );
    }
}