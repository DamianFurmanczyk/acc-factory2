import { FooterModule } from './../../shared/footer/footer.module';
import { NavModule } from './../../shared/nav/nav.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TosComponent } from './tos/tos.component';
import { TosRoutingModule } from './tos.routing';

@NgModule({
  declarations: [TosComponent],
  imports: [
    CommonModule,
    TosRoutingModule,
    NavModule,
    FooterModule
  ]
})
export class TosModule { }
