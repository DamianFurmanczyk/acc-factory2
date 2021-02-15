import { translations } from './../../../core/utils/dataMaps/translations';
import { Subscription } from 'rxjs';
import { StateService } from './../../../core/services/state.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.component.html',
  styleUrls: ['./tos.component.scss']
})
export class TosComponent implements OnInit, OnDestroy {
  sub: Subscription;
  activeTranslation: typeof translations.en = translations.en;

  constructor(private statesS: StateService) {
    this.sub = statesS.activeTranslation$.subscribe(tr => this.activeTranslation = tr);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
