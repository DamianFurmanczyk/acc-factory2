import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartStateService } from './../../core/services/cart.service';
import { StateService } from './../../core/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() contentType: string;
  @Input() mediumHideBreakdownFlag = false;

  @Output() setAppropriate: EventEmitter<string> = new EventEmitter();

  constructor(public cartS: CartStateService, public stateS: StateService) {
    stateS.paypalfee$.subscribe(console.log)
   }

  ngOnInit() {}

}
