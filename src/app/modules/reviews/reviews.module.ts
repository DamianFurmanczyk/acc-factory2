import { FooterModule } from './../../shared/footer/footer.module';
import { NavModule } from './../../shared/nav/nav.module';
import { LoaderSpinnerComponent } from './../../shared/loader-spinner/loader-spinner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewsListComponent } from './ui/reviews-list/reviews-list.component';
import { AddReviewFormComponent } from './ui/add-review-form/add-review-form.component';
import { ReviewsFeatureComponent } from './feature/feature.component';
  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  @NgModule({
    declarations: [ReviewsFeatureComponent, AddReviewFormComponent, ReviewsListComponent, LoaderSpinnerComponent],
    imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      ReviewsRoutingModule,
      NavModule, FooterModule
    ]
  })

  export class ReviewsModule { }
