import { translations } from './../../../core/utils/dataMaps/translations';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { region } from './../../../core/models/regions.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { CountryToCurrencyAbbrevMap } from './../../../core/utils/dataMaps/countryToCurrencyAbbrevMap';

@Component({
  selector: 'app-homepage-ui',
  templateUrl: './homepage-ui.component.html',
  styleUrls: ['./homepage-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageUiComponent implements OnInit {
  @Input() regions: region[] | null;
  @Input() regionActive: string | null;
  @Input() accounts: account[];
  @Input() currency: string | null;
  @Input() currencyExchangeRate: number | null;
  @Input() activeTranslation: typeof translations.en;

  @Output() addToCart: EventEmitter<account> = new EventEmitter();
  @Output() removeFromCart: EventEmitter<account> = new EventEmitter();
  @Output() changeAccountQuantity: EventEmitter<{account: account, quantity: number}> = new EventEmitter();
  @Output() onRegionSelected: EventEmitter<string> = new EventEmitter();

  currencyMap = CountryToCurrencyAbbrevMap;

  constructor() {
  }

  ngOnInit() {
  }

}
