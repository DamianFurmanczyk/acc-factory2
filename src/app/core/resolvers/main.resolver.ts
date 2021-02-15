import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

import { forkJoin, Observable } from 'rxjs';
import { StateService } from './../services/state.service';

@Injectable({providedIn: 'root'})
export class MainResolver implements Resolve<Observable<any>> {
  constructor(private stateS: StateService) {}

  resolve() {

        return forkJoin(
            this.stateS.loadDbAccountsToState(),
            this.stateS.loadDbCurrencyAndUsersCountryToState()
        );
    }
}