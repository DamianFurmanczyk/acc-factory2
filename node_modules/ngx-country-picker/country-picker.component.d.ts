import { ChangeDetectorRef, OnInit } from '@angular/core';
import { ICountry } from './country.interface';
import { CountryPickerService } from './country-picker.service';
export declare class CountryPickerComponent implements OnInit {
    private _countryPickerService;
    private _cdr;
    flag: boolean;
    setValue: string;
    setName: string;
    classes: string[];
    countries: ICountry[];
    baseUrl: string;
    constructor(_countryPickerService: CountryPickerService, _cdr: ChangeDetectorRef);
    ngOnInit(): void;
    getValue(obj: ICountry): string;
    getName(obj: ICountry): string;
}
