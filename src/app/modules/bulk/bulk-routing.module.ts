import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkComponent } from './bulk/bulk.component';


const routes: Routes = [
  {
    path: '',
    component: BulkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class BulkRoutingModule { }
