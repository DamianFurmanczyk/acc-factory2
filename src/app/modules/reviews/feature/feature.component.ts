import { filter, tap } from 'rxjs/operators';
import { Review } from '../../../core/models/reviews.interface';
import { ReviewToAdd } from './../../../core/models/reviewToAdd.interface';
import { StateService } from './../../../core/services/state.service';
import { Observable } from 'rxjs';
import { Component, } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})

export class ReviewsFeatureComponent   {
  reviews$: Observable<Review[]> = this.stateS.reviews$.pipe(
    tap((res) => {
      console.log(res)
      console.log(!res)
      console.log(res!=null)
    }),
    filter(res => res != null)
  );
  showAddReviewFormFlag: boolean = false;

  onToggleAddReviewForm() {
    this.showAddReviewFormFlag = !this.showAddReviewFormFlag
  }

  constructor(public stateS: StateService) {
    this.stateS.loadReviews();
  }

  onAddReview(review: ReviewToAdd) {
    this.stateS.addReview(review);
  }

}
