import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';
import { FooterUiComponent } from './footer-ui/footer-ui.component';

@NgModule({
  declarations: [FooterComponent, FooterUiComponent],
  imports: [
CommonModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
