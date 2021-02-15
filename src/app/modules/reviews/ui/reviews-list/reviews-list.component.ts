import { translations } from './../../../../core/utils/dataMaps/translations';
import { Review } from '../../../../core/models/reviews.interface';
import { ReviewsListPresenterService } from './reviews-list.presenter';
import { Component, OnInit, Input, ChangeDetectionStrategy, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';

const starImg = '<img class="icon icon--star icon--star-small active" src="assets/img/star-solid.svg" alt=""></img>';

let starsArrMap = {
  1: starImg,
  2: starImg.repeat(2),
  3: starImg.repeat(3),
  4: starImg.repeat(4),
  5: starImg.repeat(5)
};

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReviewsListPresenterService]
})

export class ReviewsListComponent implements OnInit, OnDestroy {
  @Output() toggleAddReviewForm = new EventEmitter<void>();
  @Input() set reviewsList(reviews: Review[]) {
    console.log(reviews)
    if(!reviews) this.reviewsLoading = true;
    if(!reviews) return;
    this.reviews = reviews;
    this.reviewsLoading = false;
    this.sort(this.activeSortingOption);
  };
  @Input() reviewsLoadingErr;
  @Input() activeTranslation: typeof translations.en = translations.en;
  reviewsLoading;
  sortedReviews: Review[] = [];
  reviews: Review[] = [];

  activeSortingOption = 'Newest first';

  remainingSortingOptions = [
    'Oldest first',
    'Best first',
    'Worst first'
  ]

  sort(sortType: string) {
    switch(sortType) {
      case 'Oldest first': this.sortByDate(false);
        break;
      case 'Worst first': this.sortByRating(false);
        break;
      case 'Best first': this.sortByRating();
        break;
      case 'Newest first': this.sortByDate();
        break;
    }
  }

  sortByDate(asc: boolean = true) {
    this.presenter.sortByDate(this.reviews, asc);
  }

  sortByRating(asc: boolean = true) {
    this.presenter.sortByRating(this.reviews, asc);
  }

  starsMap = starsArrMap;

  sortedReviewsListSub: Subscription;

  constructor(private presenter: ReviewsListPresenterService) { }

  ngOnInit(): void {
    this.sortedReviewsListSub = this.presenter.sortedReviewsList.subscribe(res => this.sortedReviews = res);
  }

  ngOnDestroy() {
    this.sortedReviewsListSub.unsubscribe();
  }

  onChangeSortingOption(i: number) {
    const tempActiveSortingOption = this.activeSortingOption;
    let remSortOpts = this.remainingSortingOptions;
    const indexOfOptToBeRemoved = remSortOpts.indexOf(remSortOpts[i]);

    this.activeSortingOption = this.remainingSortingOptions[i];
    this.remainingSortingOptions = [...remSortOpts.slice(0, indexOfOptToBeRemoved), ...remSortOpts.slice(indexOfOptToBeRemoved + 1)];
    this.remainingSortingOptions.unshift(tempActiveSortingOption);
  }

  onToggleAddReviewForm() {
    this.toggleAddReviewForm.emit();
  }

}
