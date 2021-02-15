import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';

import { cartState } from './../../../core/models/cart.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';
import { DbService } from './../../../core/services/db.service';
import { StateService } from './../../../core/services/state.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart-ui',
  templateUrl: './cart-ui.component.html',
  styleUrls: ['./cart-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartUiComponent implements OnInit, OnDestroy {
  @Input() regionIdToNameMap;
  @Input() set contentType(contentType: string) {

    console.log(this.stateS.appropriateCartToShow);

    this.contentType2 = contentType;
    if (this.contentType2 == 'checkout') {
      this.cart = this.stateS.appropriateCartToShow == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
      this.setCartOrderPriceBasedOnStatesAppropriateCartToShow();
    } else {
      this.cart = this.contentType2 == "bulk" ? this.stateS.state.bulkCart : this.stateS.state.cart;
      this.setCartOrderPriceBasedOnStatesAppropriateCartToShow();
    }

    if (contentType == 'bulk' || this.stateS.appropriateCartToShow == "bulk") this.bulkActiveFlag = true;
  };
  @Input() set cartTotalPrice(cartTotalPrice: number) {
    if(this.contentType2 == 'checkout') {
      console.log('siema')
      this.setCartOrderPriceBasedOnStatesAppropriateCartToShow();
    } else {
      this.cartTotalPriceSet = cartTotalPrice;
    }
  }
  cartTotalPriceSet;
  @Input() buttonDisabled: boolean;
  @Input() currencyExchangeRate: number;
  @Input() currency: string;
  @Input() paymentMethod: string | null;
  @Input() mediumHideBreakdownFlag: boolean;
  @Input() vat: number;
  @Input() checkoutFormStateErrorMsg = '';
  @Input() set checkoutFormState(formState) {
    if (formState == null) return;
    if (formState.paymentMethod == "crypto") {
      this.fee = this.cartTotalPriceSet * .1;
      this.feeText = 'Crypto fee';
    }
    if (formState.paymentMethod == "paypal") {
      this.fee = this.cartTotalPriceSet * .029 + .35 * this.currencyExchangeRate;
      this.feeText = 'Paypal fee';
    }
    if (formState.paymentMethod == "stripe") {
      this.fee = this.cartTotalPriceSet * .029 + .3 * this.currencyExchangeRate;
      this.feeText = 'Stripe fee';
    }
    this.fee > 0 && this.setFeeData.emit({fee: this.fee, feeText: this.feeText});
  }
  @Input() paypalFee;

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeCartAccountQuantity: EventEmitter<{ account: account, quantity: number }> = new EventEmitter();
  @Output() setAppropriateCartToShow: EventEmitter<void> = new EventEmitter();
  @Output() setFeeData: EventEmitter<{ fee, feeText }> = new EventEmitter();

  setCartOrderPriceBasedOnStatesAppropriateCartToShow() {
    console.log('siema2')
    console.log(this.stateS.appropriateCartToShow)
    this.cartTotalPriceSet = this.stateS.appropriateCartToShow == "bulk" ? this.stateS.state.bulkCart.orderPrice : this.stateS.state.cart.orderPrice;
  }

  fee = 0;
  feeText = 'Fee';

  bulkActiveFlag: boolean;

  contentType2 = '';
  cartActiveStyles = false;
  currencyMap = CountryToCurrencyAbbrevMap;
  cart: cartState;
  set setCartsEmptyFlag({ a, b }) {
    this.cartsEmptyFlags = [a, b];
    if (!this.cartsEmptyFlags.includes(true)) this.showCartsToggle = true;
  };
  showCartsToggle = false;
  cartsEmptyFlags = [true, true];
  unsubOnDestruction = new Subject();

  constructor(private dbS: DbService, public stateS: StateService) {

  }

  ngOnInit() {
    this.stateS.bulkCart$.pipe(
      takeUntil(
        this.unsubOnDestruction
      )
    ).subscribe(
      res => {
        console.log(res.accounts.reduce((prev, curr) => curr.selQuantity + prev, 0));
        (res.accounts.length > 0 && res.accounts.reduce((prev, curr) => curr.selQuantity + prev, 0) > 9) ? this.setCartsEmptyFlag = { a: this.cartsEmptyFlags[0], b: false } : this.setCartsEmptyFlag = { a: this.cartsEmptyFlags[0], b: true };
      }
    );

    this.stateS.cart$.pipe(
      takeUntil(
        this.unsubOnDestruction
      )
    ).subscribe(
      res => {
        res.accounts.length > 0 ? this.setCartsEmptyFlag = { a: false, b: this.cartsEmptyFlags[1] } : this.setCartsEmptyFlag = { a: true, b: this.cartsEmptyFlags[1] };
      }
    );
  }

  ngOnDestroy() {
    this.unsubOnDestruction.next();
    this.unsubOnDestruction.complete();
  }

  swapCarts() {
    // if (JSON.stringify(this.cart) == JSON.stringify(this.stateS.state.cart)) {
      this.bulkActiveFlag = !this.bulkActiveFlag;
      console.log(this.bulkActiveFlag)

    if (this.bulkActiveFlag) {
      return this.stateS.bulkCart$.pipe(
        takeUntil(this.unsubOnDestruction)
      ).subscribe(res => {
        this.cart = res;
        this.cartTotalPriceSet = this.stateS.state.bulkCart.orderPrice;
        console.log(res)
      });
    }
    this.stateS.cart$.pipe(
      takeUntil(this.unsubOnDestruction)
      ).subscribe(res => {
        this.cart = res;
        this.cartTotalPriceSet = this.stateS.state.cart.orderPrice;
        console.log(res)
    });
  }

  submitPayment() {

    const cartProcessed = this.bulkActiveFlag ? this.stateS.state.bulkCart.accounts : this.stateS.state.cart.accounts;

    const jsonCart = JSON.stringify(cartProcessed.map((el: account) => {

      let price = +el.price_usd * this.currencyExchangeRate;

      if(this.bulkActiveFlag) {

        if(cartProcessed.reduce((prev, next) => { return prev + next.selQuantity }, 0) >= 10) price = el.small * this.currencyExchangeRate;
        if(cartProcessed.reduce((prev, next) => { return prev + next.selQuantity }, 0) >= 100) price = el.medium * this.currencyExchangeRate;
        if(cartProcessed.reduce((prev, next) => { return prev + next.selQuantity }, 0) >= 400) price = el.large * this.currencyExchangeRate;

      }

      console.log(price)
      console.log(price)

      return { ...el, description: null, price: price.toFixed(2), currency: this.currency };

    }));

//     codes_count: 6
// created_at: null
// description: "<p>Level 30 Account.</p><p>60 000+ Blue Essence.</p><p>Unranked League All Seasons.</p><p>Fresh MMR.</p><p>Unverified e-mail.</p><p>Ordinary nickname, no bans or reports.</p><p>30 days botting-ban warranty.</p><p>Premium support.</p><p>Instant delivery.</p>"
// factory: 0
// id: 111
// large: 8.99
// medium: 9.99
// name: "Premium"
// price_usd: "16.99"
// region_id: 5
// selQuantity: 6
// slug: "EUNE smurf 50k+"
// small: 10.99
// updated_at: "2020-08-09T09:31:07.000000Z"

    console.log(cartProcessed);
    console.log(jsonCart);
    console.log(this.stateS.state.checkoutFormState);
    console.log(this.paymentMethod);


    console.log(jsonCart)
    console.log(jsonCart)
    console.log(jsonCart)
    console.log(typeof jsonCart)
    console.log(typeof jsonCart)

    this.dbS.payment(jsonCart, this.paymentMethod, this.stateS.state.checkoutFormState.email,
      this.stateS.state.checkoutFormState.fullname, this.cartTotalPriceSet);
  }

}
