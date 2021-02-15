import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutUiComponent } from './checkout-ui/checkout-ui.component';
import { CheckoutComponent } from './checkout/checkout.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartModule } from './../../shared/cart/cart.module';

import { CountrySelectComponent } from './../../shared/country-select/country-select.component';

import { PipesModule } from './../../core/pipes/pipes.module';

import { LoaderModule } from './../../shared/loader/loader.module';

@NgModule({
  declarations: [CheckoutUiComponent, CheckoutComponent, CountrySelectComponent],
  imports: [
    CommonModule,
    LoaderModule,
    CheckoutRoutingModule,
    CartModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
