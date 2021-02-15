import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './nav.component';
import { NavUiComponent } from './nav-ui/nav-ui.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavComponent, NavUiComponent],
  imports: [
  CommonModule,
    RouterModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
