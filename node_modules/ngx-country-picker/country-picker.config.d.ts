import { InjectionToken } from '@angular/core';
export declare const COUNTRY_PICKER_CONFIG: InjectionToken<CountryPickerConfig>;
export interface CountryPickerConfig {
    baseUrl: string;
    filename: string;
}
export declare const COUNTRY_PICKER_CONFIG_DEFAULT: CountryPickerConfig;
