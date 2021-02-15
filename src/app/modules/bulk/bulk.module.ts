import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkRoutingModule } from './bulk-routing.module';
import { BulkComponent } from './bulk/bulk.component';
import { BulkUiComponent } from './bulk-ui/bulk-ui.component';

import { FooterModule } from './../../shared/footer/footer.module';
import { CartModule } from './../../shared/cart/cart.module';
import { NavModule } from './../../shared/nav/nav.module';

import { PipesModule } from './../../core/pipes/pipes.module';
@NgModule({
  declarations: [BulkComponent, BulkUiComponent],
  imports: [
  CommonModule,
    BulkRoutingModule,
    PipesModule,
    FooterModule,
    CartModule,
    NavModule
  ]
})
export class BulkModule { }
