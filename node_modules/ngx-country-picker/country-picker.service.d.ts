import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryPickerConfig } from './country-picker.config';
import { ICountry } from './country.interface';
export declare class CountryPickerService {
    private _http;
    private readonly _baseUrl;
    private readonly _filename;
    private _data;
    protected static handleError(error: HttpResponse<any> | any): Observable<any>;
    constructor(config: CountryPickerConfig, _http: HttpClient);
    getCountries(): Observable<ICountry[]>;
    getBaseUrl(): string;
    private _loadData;
}
