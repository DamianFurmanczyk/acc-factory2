import { translations } from './../utils/dataMaps/translations';
import { paypalFeeMap } from './../utils/dataMaps/paypalFee';
import { Review } from './../models/reviews.interface';
import { ReviewToAdd } from './../models/reviewToAdd.interface';
import { Injectable } from '@angular/core';

import { DbService } from './db.service';

import { BehaviorSubject } from 'rxjs';

import { first, tap, catchError } from 'rxjs/operators';

import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { cartState } from './../models/cart.interface';
import { vatRates } from './data/vat';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  state = {
    regions: null,
    usersCountry: null,
    currency: null,
    countries: null,
    region: 'EUNE',
    usersCountryName: null,
    selectedCountryCode: null,
    accounts: null,
    vatRate: null,
    allRegionsAccounts: null,
    reviews: null,
    currencyExchangeRateToDollar: null,
    companyData: null,
    companyDataLoadError: null,
    cart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    },
    bulkCart: {
      accounts: [],
      coupon: null,
      discount: 0,
      orderPrice: 0
    },
    bulkCartEnoughItemsToPurchase: false,
    checkoutFormState: null,
    checkoutFormStateErrorMsg: 'Fill in the form',
    paymentMethod: null,
    paypalfee: {percentage: 2.9, flat: 0},
    feeData: {feeText: '', fee: 0},
    activeTranslation: translations.en
  }

  resolversRun = false;

  appropriateCartToShow: 'bulk' | 'main' | '' = '';

  regionIdToRegionNameMap = {};

  bulkCartEnoughItemsToPurchase$: BehaviorSubject<null | boolean> = new BehaviorSubject(this.state.bulkCartEnoughItemsToPurchase);
  regions$: BehaviorSubject<null | region[]> = new BehaviorSubject(this.state.regions);
  paypalfee$: BehaviorSubject<null | {}> = new BehaviorSubject(this.state.paypalfee);
  reviews$: BehaviorSubject<null | Review[]> = new BehaviorSubject(this.state.reviews);
  regionActive$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.region);
  paymentMethod$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.paymentMethod);
  usersCountryName$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.usersCountryName);
  companyData$: BehaviorSubject<any> = new BehaviorSubject(this.state.companyData);
  companyDataLoadError$: BehaviorSubject<any> = new BehaviorSubject(this.state.companyDataLoadError);
  vatRate$: BehaviorSubject<null | number> = new BehaviorSubject(this.state.vatRate);
  countries$: BehaviorSubject<null | {}> = new BehaviorSubject(this.state.countries);
  accounts$: BehaviorSubject<any | null> = new BehaviorSubject(this.state.accounts);
  allRegionsAccounts$: BehaviorSubject<account[] | null> = new BehaviorSubject(this.state.allRegionsAccounts);
  currency$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.currency);
  usersCountry$: BehaviorSubject<currencyOrCountry | string> = new BehaviorSubject(this.state.usersCountry);
  cart$: BehaviorSubject<cartState> = new BehaviorSubject(this.state.cart);
  bulkCart$: BehaviorSubject<cartState> = new BehaviorSubject(this.state.bulkCart);
  selectedCountryCode$: BehaviorSubject<string | null> = new BehaviorSubject(this.state.selectedCountryCode);
  cartTotalPrice$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);
  bulkCartTotalPrice$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.bulkCart.orderPrice);
  currencyExchangeRateToDollar$: BehaviorSubject<number | null> = new BehaviorSubject(this.state.cart.orderPrice);
  checkoutFormStateErrorMsg$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.checkoutFormStateErrorMsg);
  checkoutFormState$: BehaviorSubject<null | string> = new BehaviorSubject(this.state.checkoutFormState);
  feeData$: BehaviorSubject<{feeText: string, fee: number}> = new BehaviorSubject(this.state.feeData);
  activeTranslation$: BehaviorSubject<typeof translations.en> = new BehaviorSubject(this.state.activeTranslation);

  constructor(private dbS: DbService, private router: Router) {
    // console.log(clone({ asd: '123' }));
    // this.loadDbRegionsToState();
    // this.loadDbCurrencyAndUsersCountryToState();
    // this.loadDbAccountsToState();

    router.events.subscribe(val => {
      if(val instanceof NavigationEnd) {
        this.state.paymentMethod = null;
        this.paymentMethod$.next(this.state.paymentMethod);

        this.state.checkoutFormState = {};
        this.checkoutFormState$.next(this.state.checkoutFormState);

        this.state.checkoutFormStateErrorMsg = 'Select payment method';
        this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
      }
    });
  }

  onActiveTranslationChange(langName: string) {
    const langNameInLowerCase = langName.toLowerCase();
    this.state.activeTranslation = translations[langNameInLowerCase];
    this.activeTranslation$.next(this.state.activeTranslation);
  }

  onCheckoutFormStateChange(state: any, valid: boolean, paymentMethod: string) {
    console.log(valid);
    console.log(paymentMethod)
    this.state.checkoutFormState = state;
    this.state.checkoutFormStateErrorMsg = state;
    if(paymentMethod == '') {
      this.state.checkoutFormStateErrorMsg = 'Select payment method';
      this.state.checkoutFormState = {...state, paymentMethod};
      this.state.paymentMethod = paymentMethod;
      this.paymentMethod$.next(this.state.paymentMethod);
      this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
      this.checkoutFormState$.next(this.state.checkoutFormState);
      return;
    }

    if(!valid) {
      this.state.checkoutFormStateErrorMsg = 'Fill in the form';
      this.state.checkoutFormState = {...state, paymentMethod};
      this.checkoutFormState$.next(this.state.checkoutFormState);
      this.state.paymentMethod = paymentMethod;
      this.paymentMethod$.next(this.state.paymentMethod);
      this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
      return;
    }

    this.state.checkoutFormStateErrorMsg = '';
    this.checkoutFormStateErrorMsg$.next(this.state.checkoutFormStateErrorMsg);
    this.checkoutFormState$.next({...this.state.checkoutFormState, paymentMethod});
    this.state.paymentMethod = paymentMethod;
    this.paymentMethod$.next(this.state.paymentMethod);
  }

  loadVatRate(countryCode: string) {
    this.state.selectedCountryCode = countryCode;
    this.selectedCountryCode$.next(countryCode);

    const vatRecord = vatRates.rates.find(el => el.code == countryCode),
    vat = vatRecord ? vatRecord.periods[0].rates.standard : 0;

    console.log(vat);

    this.vatRate$.next(<number>vat);

    this.state = { ...this.state, vatRate: vat };
  }

  changeVatRate(n) {
    this.state.vatRate = n;

    this.vatRate$.next(n);
  }

  // loadCompanyData(countryCode: string, id: string) {
  //   return this.dbS.verifyCompany(countryCode, id).pipe(
  //     first(),
  //     catchError((err) => {
  //       throw 'Country code err';
  //     }),
  //     tap(
  //       (res: {valid: string, countryCode: string}) => {
  //         console.log(res);

  //         const valid = res.valid == 'true';

  //         if(res.countryCode == 'PL' && res.valid == 'true') {
  //           valid && this.vatRate$.next(<number>0);
  //           this.companyData$.next(res);

  //             this.state = { ...this.state, vatRate: 0, companyDataLoadError: null, companyData: res };

  //             return;
  //         }

  //         valid && this.vatRate$.next(<number>0);
  //         !valid && this.companyDataLoadError$.next(new HttpErrorResponse({}));
  //         this.companyData$.next(res);

  //         this.state = { ...this.state, vatRate: valid ? 0 : this.state.vatRate, companyDataLoadError: valid ?
  //           null:  new HttpErrorResponse({}), companyData: valid ? res: null };
  //       }
  //     )
  //   );
  // }

  laodAllRegionsAccounts() {
    return this.dbS.getAllRegionsAccounts().pipe(
      first(),
      tap((res) => {
        console.log(res);
        this.allRegionsAccounts$.next(<account[]>res);

        this.state = { ...this.state, allRegionsAccounts: res };
        console.log(this.state)
      })
    );
  }

  loadReviews() {
    this.dbS.getReviews().pipe(
      first(),
      tap((res: Review[]) => {

        const resAlt = res.map((rev: Review) => {
          let revAddedAt = !!rev['created_at'] && rev['created_at'].split('T')[0];

          console.log(!!rev['created_at'])
          console.log(!!rev['created_at'] && rev['created_at'].split('T')[0]);
          console.log(rev['created_at'])

          if(!revAddedAt) {
            revAddedAt = !!rev['updated_at'] && rev['updated_at'].split('T')[0];
          }

          return {...rev, created_at: revAddedAt || rev['created_at']};
        });

        this.state = { ...this.state, reviews: resAlt };

        this.reviews$.next(resAlt);
      })
    ).subscribe();
  }

  addReview(rev: ReviewToAdd) {
    this.dbS.addReview(rev).pipe(
      first(),
      tap(revRes => {
        console.log(revRes);
        const reviews = [{...revRes[0], created_at: revRes[0].created_at.split('T')[0]}, ...this.state.reviews];
        this.reviews$.next(
          reviews
        )
      })
    ).subscribe();
  }

  swapUserCountryAndVatRate = (c) => {
    console.log(c);
    this.state.usersCountryName = c;
    this.usersCountryName$.next(c);

    // this.state.paypalfee.flat = this.getNewPaypalFeeBasedOnCurrency(currency)
    this.state.paypalfee.percentage = this.getNewPaypalFee(c, c);
    // console.log()
    this.paypalfee$.next({...this.state.paypalfee});
  };

  laodCountries() {
    this.dbS.getCountries();
    return this.dbS.getCountries().pipe(
      first(),
      tap((res) => {

        let countriesObj = {};

				res.forEach(el => {
					countriesObj[el['alpha2Code']] = el['name'];
				});

        this.countries$.next(countriesObj);

        this.state = { ...this.state, countries: countriesObj };

        console.log(res.find);
        console.log(res);

        setTimeout(() => {
          this.state.usersCountryName = res.find(el => el['alpha2Code'] == this.state.usersCountry)['name'];
          console.log(this.state.usersCountryName);
          this.usersCountryName$.next(this.state.usersCountryName);
        }, 4000)

      })
    );
  }

  getNewPaypalFee(cc, c1) {
    let newFee,
    c = '',
    setNewFee = function(n) {newFee = n};
    if(!c1) c = vatRates.rates.find(c => c.code == cc) ? vatRates.rates.find(c => c.code == cc).name : '',

    console.log(cc);
    console.log(c);

    if(c1) c = c1;

    if(c == '') return .02;


    console.log(paypalFeeMap.europe1.includes('France'))
    console.log(paypalFeeMap.europe1.includes(c))
    console.log(newFee)

    if(paypalFeeMap['Northern Europe'].includes(c)) {
      setNewFee(.009);
    } else if(paypalFeeMap.cadOrUsa.includes(c)) {
      setNewFee(.02);
    } else if(paypalFeeMap.europe1.includes(c)) {
      setNewFee(.01);
    } else if(paypalFeeMap.europe2.includes(c)) {
      setNewFee(.02);
    } else {
      setNewFee(.02);
    }

    if(cc == 'PL') newFee = 0;

    console.log(newFee)

    console.log(this.state.cart.orderPrice)

    console.log(newFee * this.state.cart.orderPrice);

    return newFee;
  }

  setNewOrderPrice(n) {
    this.state.cart.orderPrice = n;
  }

  getNewPaypalFeeBasedOnCurrency = (ss) => paypalFeeMap.currencyBasedFee[ss] || null;

  loadDbCurrencyAndUsersCountryToState() {
    return this.dbS.getCurrencyAndUsersCountry().pipe(
      first(),
      tap(res => {
        const currency = res[0][0],
          usersCountry = res[2][0];
          console.log(usersCountry)

          this.state.paypalfee.flat = this.getNewPaypalFeeBasedOnCurrency(currency)
          this.state.paypalfee.percentage = this.getNewPaypalFee(usersCountry, null);
          this.paypalfee$.next({...this.state.paypalfee});

        this.currency$.next(currency);
        this.usersCountry$.next(usersCountry);

        // console.log(res);

        this.loadCurrencyExchangeRateToDollar(currency);

        this.state = { ...this.state, currency, usersCountry };
        // console.log(this.state)
        this.loadVatRate(usersCountry);
      })
    );
  }

  loadCurrencyExchangeRateToDollar(currencyName: string) {
    this.dbS.getExchangeRateToDollar(currencyName).pipe(
      first()
    ).subscribe(res => {
      // console.log(res)

      this.state = { ...this.state, currencyExchangeRateToDollar: res, currency: currencyName };
      this.currencyExchangeRateToDollar$.next(<number>res);
      this.currency$.next(currencyName);
      // console.log(this.state)
    });
  }

  changeCurrency(currencyName: string) {
    this.loadCurrencyExchangeRateToDollar(currencyName);
  }

  changeAccountSelectedQuantity(e: { acc: account, quantityAdded: number }) {
    let targetAccInStateWithIndex: { acc: account, i: number };
    this.state.accounts.find((loopAccount, i) => {
      if (loopAccount.id == e.acc.id) {
        targetAccInStateWithIndex = { acc: loopAccount, i };
        return true;
      }
    });

    const selTargetAccQuantity = +this.state.accounts[targetAccInStateWithIndex.i].selQuantity,
      newQ = +selTargetAccQuantity + +e.quantityAdded;

    if (newQ < 1 || newQ > targetAccInStateWithIndex.acc.count) return;

    this.state.accounts[targetAccInStateWithIndex.i] = {
      ...e.acc,
      selQuantity: newQ
    }
  }

  loadDbRegionsToState() {
    return this.dbS.getRegions().pipe(
      first(),
      tap((res: region[]) => {
        res.forEach(
          el => this.regionIdToRegionNameMap[el.id] = el.name
        );

        this.state = { ...this.state, regions: res };
        this.regions$.next(res);
      })
    );
  }

  updateAccountsBasedOnRegion(regionSelected: string) {
    this.state.region = regionSelected;
    this.regionActive$.next(regionSelected);
    console.log(regionSelected);
    console.log(this.state.regions);

    this.loadDbAccountsToState().subscribe();
  }

  loadDbAccountsToState() {
    return this.dbS.getAccounts(this.state.region).pipe(
      first(),
      tap(res => {
        let currIndex = 0;
        const resFormatted = res.acc.map(acc => {
          const count = res.count[currIndex++]
          return { ...acc, count, selQuantity: count > 0 ? 1 : 0 }
        })
        this.state = { ...this.state, accounts: resFormatted };
        this.accounts$.next(resFormatted);
      })
    );
  }

}
