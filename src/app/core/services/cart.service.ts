import { Injectable } from '@angular/core';
import { StateService } from './state.service';

import { account } from 'src/app/core/models/accounts.interface';
import { cartState } from './../models/cart.interface';
@Injectable({
  providedIn: 'root'
})

export class CartStateService {
  constructor(private stateS: StateService) {
    this.stateS.cart$.subscribe(cart => {
      let totalItems = 0;
      cart.accounts.forEach(el => totalItems += el.selQuantity);
      console.log(cart);
      console.log('eval cart');
      this.stateS.state.bulkCartEnoughItemsToPurchase = totalItems >= 1;
      this.stateS.bulkCartEnoughItemsToPurchase$.next(totalItems >= 1);
      console.log(this.stateS.state.bulkCartEnoughItemsToPurchase )
      this.evaluateCartOrderPrice(cart);
    })
    this.stateS.bulkCart$.subscribe(cart => {
      let totalItems = 0;
      cart.accounts.forEach(el => totalItems += el.selQuantity);
      // this.stateS.state.bulkCartEnoughItemsToPurchase = totalItems >= 10;
      // this.stateS.bulkCartEnoughItemsToPurchase$.next(totalItems >= 10);
      console.log(cart);
      console.log('eval cart');
      this.evaluateCartOrderPrice(cart, true);
    })
  }

  changeOrderQuantity(e: {acc: account, quantityAdded: number}) {
    console.log(e.acc)
    const bulkCartFlag = !!e.acc.codes_count;

    let targetAccInStateWithIndex: {acc: account, i: number};
    if(bulkCartFlag) {
      this.stateS.state.bulkCart.accounts.find((loopAccount, i) => {
        if (loopAccount.id == e.acc.id) {
          targetAccInStateWithIndex = {acc: loopAccount, i};
          return true;
        }
      });
      const selTargetAccQuantity = +this.stateS.state.bulkCart.accounts[targetAccInStateWithIndex.i].selQuantity;
      let newQ = +selTargetAccQuantity + +e.quantityAdded;

      if (newQ < 1) return;

      if(newQ > targetAccInStateWithIndex.acc.count) {
        newQ = targetAccInStateWithIndex.acc.count
      }

      this.stateS.state.bulkCart.accounts[targetAccInStateWithIndex.i] = {
        ...e.acc,
        selQuantity: newQ
      }
      this.stateS.bulkCart$.next({...this.stateS.state.bulkCart});
    } else {
      this.stateS.state.cart.accounts.find((loopAccount, i) => {
        if (loopAccount.id == e.acc.id) {
          targetAccInStateWithIndex = {acc: loopAccount, i};
          return true;
        }
      });
      const selTargetAccQuantity = +this.stateS.state.cart.accounts[targetAccInStateWithIndex.i].selQuantity;
      let newQ = +selTargetAccQuantity + +e.quantityAdded;

      if (newQ < 1) return;

      if(newQ > targetAccInStateWithIndex.acc.count) {
        newQ = targetAccInStateWithIndex.acc.count
      }

      this.stateS.state.cart.accounts[targetAccInStateWithIndex.i] = {
        ...e.acc,
        selQuantity: newQ
      }
      this.stateS.cart$.next({...this.stateS.state.cart});
    }



  }

  addToCart(acc: account) {
    const bulkCartFlag = !!acc.codes_count;
    console.log(acc);
    if(acc.selQuantity > acc.count || acc.selQuantity > acc.codes_count) acc.selQuantity = acc.codes_count || acc.count;
    let accInCartStateWithIndex: {acc: account, i: number};

    if(bulkCartFlag) {
      this.stateS.state.bulkCart.accounts.find((loopAccount, i) => {
        if (loopAccount.id == acc.id) {
          accInCartStateWithIndex = {acc: loopAccount, i};
          return true;
        }
      });
    } else {
      this.stateS.state.cart.accounts.find((loopAccount, i) => {
        if (loopAccount.id == acc.id) {
          accInCartStateWithIndex = {acc: loopAccount, i};
          return true;
        }
      });
    }



    if (accInCartStateWithIndex != undefined) {
      let newQuantity = accInCartStateWithIndex.acc.selQuantity + acc.selQuantity;
      if(acc.count < newQuantity || acc.codes_count < newQuantity) {
        newQuantity = acc.count || acc.codes_count;
      }
      bulkCartFlag ? this.stateS.state.bulkCart.accounts[accInCartStateWithIndex.i] = { ...acc, selQuantity: newQuantity } : this.stateS.state.cart.accounts[accInCartStateWithIndex.i] = { ...acc, selQuantity: newQuantity };
    } else {
      bulkCartFlag ? this.stateS.state.bulkCart.accounts.push({ ...acc }) : this.stateS.state.cart.accounts.push({ ...acc });
    }
    bulkCartFlag ? this.stateS.bulkCart$.next({ ...this.stateS.state.bulkCart }) : this.stateS.cart$.next({ ...this.stateS.state.cart });
  }

  removeFromCart(acc2rem: account, bulkCartFlag = false) {
    console.log(acc2rem)
    if(!bulkCartFlag) {
      this.stateS.state.cart.accounts = this.stateS.state.cart.accounts.filter(acc => acc.id != acc2rem.id);
      this.stateS.cart$.next({ ...this.stateS.state.cart });
      return;
    }
    this.stateS.state.bulkCart.accounts = this.stateS.state.bulkCart.accounts.filter(acc => acc.id != acc2rem.id);
    this.stateS.bulkCart$.next({ ...this.stateS.state.bulkCart });
  }

  evaluateCartOrderPrice(cart: cartState, bulkCartFlag = false) {
    console.log(cart.accounts);
    let newTotal = 0;
    cart.accounts.forEach(acc => newTotal += acc.selQuantity * (+acc.price_usd * this.stateS.state.currencyExchangeRateToDollar));
    console.log(newTotal)
    if(!bulkCartFlag) {
      this.stateS.setNewOrderPrice(newTotal);
      this.stateS.cartTotalPrice$.next(newTotal);
      return;
    }
    console.log(newTotal);
    this.stateS.state.bulkCart.orderPrice = newTotal;
    this.stateS.bulkCartTotalPrice$.next(newTotal);
  }
}
