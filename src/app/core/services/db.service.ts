import { CookiesAppService } from './cookie.service';
import { Review } from '../models/reviews.interface';

import { ReviewToAdd } from './../models/reviewToAdd.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { region } from './../models/regions.interface';
import { currencyOrCountry } from '../models/usersCurrencyCountryResponse.interface';
import { accountsDataResponse } from '../models/accounts.interface';
import { account } from 'src/app/core/models/accounts.interface';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DbService {
	constructor(private http: HttpClient, private CookiesAppService: CookiesAppService) { }

	apiUrl = 'https://api.abcleague.webup-dev.pl/';

	getCurrencyAndUsersCountry() {
		return this.http.get<currencyOrCountry[]>(this.apiUrl + 'currency');
  }

  getReviews() {
    return forkJoin(this.http.get<Review[]>(this.apiUrl + 'reviews'),
      this.http.get<Review[]>(this.apiUrl + 'reviews/' +  + this.CookiesAppService.randCookie)).pipe(map(res => [...res[0], ...res[1]]));
  }

  addReview(review: ReviewToAdd) {
    return this.http.get(this.apiUrl + `reviews/add/${review.tekst}/${review.author}/${review.stars}/${this.CookiesAppService.randCookie}`);
  }

	verifyOrder(id: string) {
		return this.http.get(this.apiUrl + `verify/${id}`);
	}

	// payment(cartJSON: string, paymentMethod: string, email: string, fullname: string, localPrice: string | number) {
	// 	return this.http.get(this.apiUrl + `koszyk/?cart=${cartJSON}&paymentMethod=${paymentMethod}&email=${email}&localPrice=${localPrice}&fullname=${fullname}`);
	// }

	payment(cartJSON: string, paymentMethod: string, email: string, fullname: string, localPrice: string | number) {
		console.log(cartJSON);
		console.log(typeof cartJSON);

		// return fetch(
		// 	`https://api.accounts4life.com/koszyk?koszyk=${cartJSON}&name=${name}&email=${email}&localPrice=${localPrice}`,
		// 	{ method: "post",headers: {'Content-Type': 'application/json'} })
		// 	.then(res => {
		// 		console.log(res);
		// 		return res.json();
		// 	});
		// return this.http.get(this.apiUrl + `koszyk/?cart=${cartJSON}&paymentMethod=${paymentMethod}&email=${email}&localPrice=${localPrice}&fullname=${fullname}`).subscribe(
		return this.http.get(`https://api.accounts4life.com/koszyk/${cartJSON}/saddasdsa/8888888888/${email}/${localPrice}`).subscribe(
				res=> {
					console.log('asd')
					console.log(res)
				}
			);
		return this.http.post('https://api.accounts4life.com/koszyk', {
				// region_id,
				// currency,
				// price_usd,
				// selQuantity,
			}).subscribe(
				console.log
			);
	}

	verifyCompany(countryCode: string, id: string) {
		return this.http.get(this.apiUrl + `checkVat/${countryCode}/${id}`);
	}

	getCountries() {
		return this.http.get('https://restcountries.eu/rest/v2/all').pipe(
			map((res: any[]) => {
        return res;
			})
		);
	}

	getExchangeRateToDollar(currency: string) {
		return this.http.get(this.apiUrl + `convert/1/USD/${currency}`);
	}

	getCoupons() {
		return this.http.get(this.apiUrl + 'coupon')
	}

	getAccounts(regionName: string) {
		return this.http.get<accountsDataResponse>(this.apiUrl + 'accounts/regionname/' + regionName);
	  }

	  getAllRegionsAccounts() {
		return this.http.get<account[]>(this.apiUrl + 'accounts');
	}

	getRegions() {
		return this.http.get<region[]>(this.apiUrl + 'regions');
	}

	// initiatePaypalPayment(price: number | string, currency: string, quantity: number, description: string,) {
	// 	return fetch(
	// 		`https://api.abcleague.webup-dev.pl/pay_paypal?region=${this.selectedRegion.name}&description=${description}&price=${price}&currency=${currency}&quantity=${quantity}`,
	// 		{ method: "post" })
	// 		.then(res => res.json());
	// }
}
