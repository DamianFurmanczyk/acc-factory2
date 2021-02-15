import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from './../../../core/services/state.service';
import { CartStateService } from './../../../core/services/cart.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { account } from 'src/app/core/models/accounts.interface';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(public stateS: StateService, public cartS: CartStateService) {
  }

  accModified$: BehaviorSubject<account[]> = new BehaviorSubject([]);
  accModifiedSub: Subscription;

  ngOnInit() {
    this.accModifiedSub = this.stateS.accounts$.subscribe(
      res =>
      {
        // let accCopy = [...res];
        // accCopy.unshift(accCopy[5]);
        // accCopy.pop();
        // console.log(res)
        this.accModified$.next(res.map(el => {
          return {...el, from: 'homepage'}
        }))
      }
      )
  }

  ngOnDestroy() {
    this.accModifiedSub.unsubscribe();
  }

}
