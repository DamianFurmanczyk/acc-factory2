import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartUiComponent } from './cart-ui/cart-ui.component';
import { RouterModule } from '@angular/router';

import { QuantityBtnsModule } from '../quantity-btns/quantity-btns.module';
import { PipesModule } from './../../core/pipes/pipes.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  declarations: [CartComponent, CartUiComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    RouterModule,
    QuantityBtnsModule,
    PipesModule
  ],
  exports: [CartComponent]
})
export class CartModule {}
