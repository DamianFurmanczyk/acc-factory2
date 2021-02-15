import { ModuleWithProviders } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryPickerConfig } from './country-picker.config';
import { CountryPickerService } from './country-picker.service';
export declare function countryPickerServiceFactory(config: CountryPickerConfig, http: HttpClient): CountryPickerService;
export declare class CountryPickerModule {
    static forRoot(providedConfig?: CountryPickerConfig): ModuleWithProviders<CountryPickerModule>;
    constructor(parentModule: CountryPickerModule);
}
