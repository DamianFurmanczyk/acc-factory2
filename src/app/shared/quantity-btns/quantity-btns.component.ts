import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CartStateService } from './../../core/services/cart.service';
import { StateService } from './../../core/services/state.service';
import { account } from 'src/app/core/models/accounts.interface';

@Component({
  selector: 'app-quantity-btns',
  templateUrl: './quantity-btns.component.html',
  styleUrls: ['./quantity-btns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityBtnsComponent implements OnInit {
  @Input() accountQuantityNoDisplay = false;
  @Input() account: account;

  @Output() quantityChange: EventEmitter<{acc: account, quantityAdded: number}> = new EventEmitter();

  constructor(public cartS: CartStateService, public stateS: StateService) { }

  ngOnInit() {
  }

}
