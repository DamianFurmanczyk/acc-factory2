import { CheckoutGuard } from './core/services/checkout.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomepageResolver } from './core/resolvers/homepage.resolver';
import { CheckoutResolver } from './core/resolvers/checkout.resolver';
// import { BulkResolver } from './core/resolvers/bulk.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {HomepageResolver},
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/homepage/homepage.module').then(m => m.HomepageModule)
      },
      {
        path: 'reviews',
        loadChildren: () => import('./modules/reviews/reviews.module').then(m => m.ReviewsModule)
      },
      {
        path: 'tos',
        loadChildren: () => import('./modules/tos/tos.module').then(m => m.TosModule)
      },
      // {
      //   path: 'bulk',
      //   loadChildren: () => import('./modules/bulk/bulk.module').then(m => m.BulkModule),
      //   resolve: {BulkResolver}
      // },
      {
        path: 'checkout',
        loadChildren: () => import('./modules/checkout/checkout.module').then(m => m.CheckoutModule),
        resolve: {CheckoutResolver}, canActivate: [CheckoutGuard]
      },
      {
        path: '**', redirectTo: ''
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

