import { CookieService } from 'ngx-cookie-service';
import { CookieConsentBarComponent } from './shared/cookie-consent-bar/cookie-consent-bar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { QuantityBtnsModule } from './shared/quantity-btns/quantity-btns.module';

import { PipesModule } from './core/pipes/pipes.module';

import { HomepageResolver } from './core/resolvers/homepage.resolver';
import { CheckoutResolver } from './core/resolvers/checkout.resolver';
import { BulkResolver } from './core/resolvers/bulk.resolver';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [AppComponent, CookieConsentBarComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    QuantityBtnsModule,
    PipesModule
  ],
  providers: [
    HomepageResolver,
    CheckoutResolver,
    BulkResolver,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
