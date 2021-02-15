  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { HomepageRoutingModule } from './homepage-routing.module';
  import { HomepageComponent } from './homepage/homepage.component';
  import { HomepageUiComponent } from './homepage-ui/homepage-ui.component';

  import { FooterModule } from './../../shared/footer/footer.module';
  import { CartModule } from './../../shared/cart/cart.module';
  import { NavModule } from './../../shared/nav/nav.module';

  import { QuantityBtnsModule } from '../../shared/quantity-btns/quantity-btns.module';
  import { PipesModule } from './../../core/pipes/pipes.module';

  import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
  import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
  import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
  const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {};
  @NgModule({
    declarations: [HomepageComponent, HomepageUiComponent],
    imports: [
      PerfectScrollbarModule,
      CommonModule,
      HomepageRoutingModule,
      FooterModule,
      QuantityBtnsModule,
      PipesModule,
      CartModule,
      NavModule
    ],
    providers: [
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
    ]
  })
  export class HomepageModule { }
