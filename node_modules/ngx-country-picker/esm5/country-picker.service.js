import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { COUNTRY_PICKER_CONFIG } from './country-picker.config';
var CountryPickerService = /** @class */ (function () {
    function CountryPickerService(config, _http) {
        this._http = _http;
        this._data = null;
        this._baseUrl = config.baseUrl;
        this._filename = config.filename;
        this._data = this._loadData();
    }
    CountryPickerService_1 = CountryPickerService;
    CountryPickerService.handleError = function (error) {
        var errMsg;
        if (error instanceof HttpResponse) {
            if (error.status === 404) {
                errMsg = 'Error loading countries.json file.'
                    + ' Please configure WebPack and load countries.json assets to your root folder';
            }
            else {
                var body = error.body || '';
                var err = body.error || JSON.stringify(body);
                errMsg = error.status + " - " + (error.statusText || '') + " " + err;
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    };
    CountryPickerService.prototype.getCountries = function () {
        return this._data
            .pipe(map(function (countries) {
            return countries.map(function (country) {
                country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
                return country;
            });
        }));
    };
    CountryPickerService.prototype.getBaseUrl = function () {
        return this._baseUrl;
    };
    CountryPickerService.prototype._loadData = function () {
        return this._http.get(this._baseUrl + this._filename)
            .pipe(catchError(CountryPickerService_1.handleError));
    };
    var CountryPickerService_1;
    CountryPickerService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [COUNTRY_PICKER_CONFIG,] }] },
        { type: HttpClient }
    ]; };
    CountryPickerService = CountryPickerService_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(COUNTRY_PICKER_CONFIG))
    ], CountryPickerService);
    return CountryPickerService;
}());
export { CountryPickerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jb3VudHJ5LXBpY2tlci8iLCJzb3VyY2VzIjpbImNvdW50cnktcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxxQkFBcUIsRUFBdUIsTUFBTSx5QkFBeUIsQ0FBQztBQUlyRjtJQXdCRSw4QkFDaUMsTUFBMkIsRUFDbEQsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQXRCbkIsVUFBSyxHQUFrQyxJQUFJLENBQUM7UUF3QmxELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs2QkEvQlUsb0JBQW9CO0lBTWQsZ0NBQVcsR0FBNUIsVUFBNkIsS0FBOEI7UUFDekQsSUFBSSxNQUFjLENBQUM7UUFDbkIsSUFBSSxLQUFLLFlBQVksWUFBWSxFQUFFO1lBQ2pDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3hCLE1BQU0sR0FBRyxvQ0FBb0M7c0JBQ3pDLDhFQUE4RSxDQUFDO2FBQ3BGO2lCQUFNO2dCQUNMLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUM5QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sR0FBTSxLQUFLLENBQUMsTUFBTSxZQUFNLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxVQUFJLEdBQUssQ0FBQzthQUMvRDtTQUNGO2FBQU07WUFDTCxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBV00sMkNBQVksR0FBbkI7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLO2FBQ2QsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLFNBQXFCO1lBQ3hCLE9BQUEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQWlCO2dCQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEYsT0FBTyxPQUFPLENBQUM7WUFDakIsQ0FBQyxDQUFDO1FBSEYsQ0FHRSxDQUNILENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFTSx5Q0FBVSxHQUFqQjtRQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU8sd0NBQVMsR0FBakI7UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFhLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUM5RCxJQUFJLENBQ0gsVUFBVSxDQUFDLHNCQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUM3QyxDQUFDO0lBQ04sQ0FBQzs7O2dEQTdCRSxNQUFNLFNBQUMscUJBQXFCO2dCQUNkLFVBQVU7O0lBMUJoQixvQkFBb0I7UUFEaEMsVUFBVSxFQUFFO1FBMEJSLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO09BekJyQixvQkFBb0IsQ0F1RGhDO0lBQUQsMkJBQUM7Q0FBQSxBQXZERCxJQXVEQztTQXZEWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgQ09VTlRSWV9QSUNLRVJfQ09ORklHLCBDb3VudHJ5UGlja2VyQ29uZmlnIH0gZnJvbSAnLi9jb3VudHJ5LXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgSUNvdW50cnkgfSBmcm9tICcuL2NvdW50cnkuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvdW50cnlQaWNrZXJTZXJ2aWNlIHtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9iYXNlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZpbGVuYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgX2RhdGE6IE9ic2VydmFibGU8SUNvdW50cnlbXT4gfCBudWxsID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgc3RhdGljIGhhbmRsZUVycm9yKGVycm9yOiBIdHRwUmVzcG9uc2U8YW55PiB8IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgbGV0IGVyck1zZzogc3RyaW5nO1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIGVyck1zZyA9ICdFcnJvciBsb2FkaW5nIGNvdW50cmllcy5qc29uIGZpbGUuJ1xuICAgICAgICAgICsgJyBQbGVhc2UgY29uZmlndXJlIFdlYlBhY2sgYW5kIGxvYWQgY291bnRyaWVzLmpzb24gYXNzZXRzIHRvIHlvdXIgcm9vdCBmb2xkZXInO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYm9keSA9IGVycm9yLmJvZHkgfHwgJyc7XG4gICAgICAgIGNvbnN0IGVyciA9IGJvZHkuZXJyb3IgfHwgSlNPTi5zdHJpbmdpZnkoYm9keSk7XG4gICAgICAgIGVyck1zZyA9IGAke2Vycm9yLnN0YXR1c30gLSAke2Vycm9yLnN0YXR1c1RleHQgfHwgJyd9ICR7ZXJyfWA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVyck1zZyA9IGVycm9yLm1lc3NhZ2UgPyBlcnJvci5tZXNzYWdlIDogZXJyb3IudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvcihlcnJNc2cpO1xuICAgIHJldHVybiB0aHJvd0Vycm9yKGVyck1zZyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KENPVU5UUllfUElDS0VSX0NPTkZJRykgY29uZmlnOiBDb3VudHJ5UGlja2VyQ29uZmlnLFxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnRcbiAgKSB7XG4gICAgdGhpcy5fYmFzZVVybCA9IGNvbmZpZy5iYXNlVXJsO1xuICAgIHRoaXMuX2ZpbGVuYW1lID0gY29uZmlnLmZpbGVuYW1lO1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9sb2FkRGF0YSgpO1xuICB9XG5cbiAgcHVibGljIGdldENvdW50cmllcygpOiBPYnNlcnZhYmxlPElDb3VudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoY291bnRyaWVzOiBJQ291bnRyeVtdKSA9PlxuICAgICAgICAgIGNvdW50cmllcy5tYXAoKGNvdW50cnk6IElDb3VudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb3VudHJ5Lm5hbWUubmF0aXZlWzBdID0gY291bnRyeS5uYW1lLm5hdGl2ZVtPYmplY3Qua2V5cyhjb3VudHJ5Lm5hbWUubmF0aXZlKVswXV07XG4gICAgICAgICAgICByZXR1cm4gY291bnRyeTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIGdldEJhc2VVcmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFzZVVybDtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWREYXRhKCk6IE9ic2VydmFibGU8SUNvdW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9odHRwLmdldDxJQ291bnRyeVtdPih0aGlzLl9iYXNlVXJsICsgdGhpcy5fZmlsZW5hbWUpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcihDb3VudHJ5UGlja2VyU2VydmljZS5oYW5kbGVFcnJvcilcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==