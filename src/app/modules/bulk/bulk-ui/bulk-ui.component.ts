import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { account } from 'src/app/core/models/accounts.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';
import { Event } from '@angular/router';
import { StateService } from './../../../core/services/state.service';
@Component({
  selector: 'app-bulk-ui',
  templateUrl: './bulk-ui.component.html',
  styleUrls: ['./bulk-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BulkUiComponent implements OnInit {
  @Output() addToCart = new EventEmitter();

  @Input() currency;
  @Input() currencyExchangeRate;
  @Input() regionIdToNameMap = {};
  @Input() set accounts(accounts: account[]) {
    console.log(accounts);
    this.groupAccountsByRegion(accounts);
  }

  currentQuantitySel: number;

  currencyMap = CountryToCurrencyAbbrevMap;

  accountsGrouped;

  mapNameToDust = {
    'Basic': '40k',
    'Standard': '50k',
    'Premium': '60k',
    'Capsules': 'Caps'
  };

  getAccWithSelQuantity(acc: account, selQuantity) {
    const refferedAcc = this.stateS.state.cart.accounts.find(el => el.id == acc.id);
    if(!refferedAcc) return {...acc, selQuantity};
    return refferedAcc;
  }

  addToCartLocal(account: account) {
    const accWithQtity = this.getAccWithSelQuantity(account, this.currentQuantitySel);
    console.log(accWithQtity.codes_count)
    console.log(this.currentQuantitySel)
    console.log(accWithQtity.selQuantity)
    if(this.currentQuantitySel > 0) {
      this.addToCart.emit(accWithQtity);
    }
  }

  // addToCartLocal(account: account) {
  //   const accWithQtity = this.getAccWithSelQuantity(account, this.currentQuantitySel);
  //   console.log(accWithQtity.codes_count)
  //   console.log(this.currentQuantitySel)
  //   console.log(accWithQtity.selQuantity)
  //   if(this.currentQuantitySel > 0) {
  //     console.log(accWithQtity.codes_count >= accWithQtity.selQuantity + this.currentQuantitySel);
  //     if(accWithQtity.codes_count > accWithQtity.selQuantity + this.currentQuantitySel) {
  //       this.addToCart.emit(accWithQtity);
  //     } else {
  //       this.addToCart.emit({...accWithQtity, selQuantity: accWithQtity.codes_count});
  //     }

        
  //   }
  // }

  updateCurrentQuantitySel(e) {
    const val = +e.target.value;
    if(!isNaN(val)) this.currentQuantitySel = val;
  }

  groupAccountsByRegion(accounts: account[]) {
    let accArr = [];
    const omitValues = ['Epic', 'Legendary'];

    console.log(accounts);
  
    accounts.forEach(
      accounts => {
        if(omitValues.includes(accounts.name)) return;
        const appropArr = accArr.find(el => el.regionId == accounts.region_id);
        if(appropArr) {
          appropArr.accounts.push(accounts);
        } else {
          accArr.push({regionId: accounts.region_id, accounts: [accounts]});
        }
      }
    );

    console.log(accArr);

    this.accountsGrouped = accArr;
  }

  constructor(private stateS: StateService) { }

  ngOnInit() {
  }

}
