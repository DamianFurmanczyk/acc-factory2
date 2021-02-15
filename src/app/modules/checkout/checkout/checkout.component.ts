import { Component, OnInit } from '@angular/core';
import { StateService } from './../../../core/services/state.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(public stateS: StateService) { }

  ngOnInit() {
  }

}
