import { translations } from './../../../core/utils/dataMaps/translations';
import { filter, first, tap } from 'rxjs/operators';
import { ActivationEnd, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input , OnDestroy} from '@angular/core';
import { ScrollService } from './../../../core/services/scroll.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-nav-ui',
  templateUrl: './nav-ui.component.html',
  styleUrls: ['./nav-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavUiComponent implements OnInit, OnDestroy {
  @Output() currencyChange: EventEmitter<string> = new EventEmitter();
  @Output() translationChange: EventEmitter<string> = new EventEmitter();
  @Input() currency;
  @Input() homepageStyles;
  @Input() reviewStyles;
  @Input() set countrySetter(c: string) {
    if(['PL', 'ES', 'DE', 'EN'].includes(c)) this.setActiveFlagOption(c);
    this.flagOptionActive = c;
    this.translationChange.emit(c);
  };

  navActiveFlag = false;
  @Input() activeTranslation: typeof translations.en = translations.en;
  @Input() set currencySetHandler(excludeCurr) {
    console.log('to rem after resolvers or smth')
    console.log(excludeCurr)
    if(!excludeCurr) {
      return;
    }
    if(!this.hasCurrencyBeenSetBasedOnIpFlag) {
      this.currencyOptions = [...this.currencyOptions, excludeCurr];
      this.initialCurrencyBasedOnIp = excludeCurr;
      this.hasCurrencyBeenSetBasedOnIpFlag = true;
    }

    this.activeCurrency = excludeCurr;
    this.currencyOptionsToDisplay = this.currencyOptions.filter(el => el != excludeCurr);
    if(this.initialCurrencyOptions.includes(excludeCurr) && this.initialCurrencyOptions.includes(this.initialCurrencyBasedOnIp)) {
      this.currencyOptionsToDisplay = this.initialCurrencyOptions;
    }
  }

  hasCurrencyBeenSetBasedOnIpFlag = false;

  initialCurrencyBasedOnIp: string;
  activeCurrency = '';

  initialCurrencyOptions = [
    'EUR',
    'USD',
    'GBP'
  ];
  flagOptionsToDisplay = ['PL', 'ES', 'DE'];
  currencyOptions = this.initialCurrencyOptions;
  currencyOptionsToDisplay: string[] = [];
  flagOptionActive = 'EN';

  sub: Subscription;

  showHomepageLink = false;

  toggleLang(name) {
    this.setActiveFlagOption(name);
    this.translationChange.emit(name);
  }

  setActiveFlagOption(name: string) {
    console.log(name)
    const flagOptionsToDisplayWithNoSelected = this.flagOptionsToDisplay.filter(el => {
      return el != name;
    });

    this.flagOptionsToDisplay = [...flagOptionsToDisplayWithNoSelected, this.flagOptionActive];
    this.flagOptionActive = name;
  }

  constructor(public scrollS: ScrollService, private router: Router) {
    this.sub = this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      tap(e=> {
        this.showHomepageLink = e['snapshot']['_routerState']['url'] == '/' ? false : true;
      })
    ).subscribe();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
