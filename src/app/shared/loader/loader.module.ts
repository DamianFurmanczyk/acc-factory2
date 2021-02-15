import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderCompComponent } from './loader-comp/loader-comp.component';



@NgModule({
  declarations: [LoaderCompComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderCompComponent]
})
export class LoaderModule { }
