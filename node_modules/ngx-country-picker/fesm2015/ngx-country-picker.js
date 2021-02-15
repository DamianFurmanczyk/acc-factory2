import { __decorate, __param } from 'tslib';
import { InjectionToken, Inject, Injectable, ChangeDetectorRef, Input, Component, ChangeDetectionStrategy, Optional, SkipSelf, NgModule } from '@angular/core';
import { HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const COUNTRY_PICKER_CONFIG = new InjectionToken('countrypicker.config');
const COUNTRY_PICKER_CONFIG_DEFAULT = {
    baseUrl: 'assets/',
    filename: 'countries.json',
};

var CountryPickerService_1;
let CountryPickerService = CountryPickerService_1 = class CountryPickerService {
    constructor(config, _http) {
        this._http = _http;
        this._data = null;
        this._baseUrl = config.baseUrl;
        this._filename = config.filename;
        this._data = this._loadData();
    }
    static handleError(error) {
        let errMsg;
        if (error instanceof HttpResponse) {
            if (error.status === 404) {
                errMsg = 'Error loading countries.json file.'
                    + ' Please configure WebPack and load countries.json assets to your root folder';
            }
            else {
                const body = error.body || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(errMsg);
    }
    getCountries() {
        return this._data
            .pipe(map((countries) => countries.map((country) => {
            country.name.native[0] = country.name.native[Object.keys(country.name.native)[0]];
            return country;
        })));
    }
    getBaseUrl() {
        return this._baseUrl;
    }
    _loadData() {
        return this._http.get(this._baseUrl + this._filename)
            .pipe(catchError(CountryPickerService_1.handleError));
    }
};
CountryPickerService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [COUNTRY_PICKER_CONFIG,] }] },
    { type: HttpClient }
];
CountryPickerService = CountryPickerService_1 = __decorate([
    Injectable(),
    __param(0, Inject(COUNTRY_PICKER_CONFIG))
], CountryPickerService);

let CountryPickerComponent = class CountryPickerComponent {
    constructor(_countryPickerService, _cdr) {
        this._countryPickerService = _countryPickerService;
        this._cdr = _cdr;
        this.flag = false;
        this.setValue = 'cca3';
        this.setName = 'name.common';
        this.classes = ['form-control', 'form-control-sm'];
        this.countries = [];
        this.baseUrl = _countryPickerService.getBaseUrl() + 'data/';
    }
    ngOnInit() {
        this._countryPickerService.getCountries()
            .subscribe(countries => {
            this.countries = countries.sort((a, b) => {
                let na = this.getName(a);
                let nb = this.getName(b);
                if (na > nb) {
                    return 1;
                }
                if (na < nb) {
                    return -1;
                }
                return 0;
            });
            this._cdr.markForCheck();
        });
    }
    getValue(obj) {
        return this.setValue.split('.').reduce((o, i) => o[i], obj);
    }
    getName(obj) {
        return this.setName.split('.').reduce((o, i) => o[i], obj);
    }
};
CountryPickerComponent.ctorParameters = () => [
    { type: CountryPickerService },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], CountryPickerComponent.prototype, "flag", void 0);
__decorate([
    Input()
], CountryPickerComponent.prototype, "setValue", void 0);
__decorate([
    Input()
], CountryPickerComponent.prototype, "setName", void 0);
__decorate([
    Input()
], CountryPickerComponent.prototype, "classes", void 0);
CountryPickerComponent = __decorate([
    Component({
        selector: 'country-picker',
        template: `
      <select [class]="classes">
          <option *ngFor="let c of countries" [value]="getValue(c)">
              <img *ngIf="flag" [src]="baseUrl + c.cca3.toLowerCase() + '.svg'">{{ getName(c) }}
          </option>
      </select>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], CountryPickerComponent);

var CountryPickerModule_1;
function countryPickerServiceFactory(config, http) {
    return new CountryPickerService(config, http);
}
let CountryPickerModule = CountryPickerModule_1 = class CountryPickerModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('CountryPickerModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(providedConfig = COUNTRY_PICKER_CONFIG_DEFAULT) {
        return {
            ngModule: CountryPickerModule_1,
            providers: [
                { provide: COUNTRY_PICKER_CONFIG, useValue: providedConfig },
                {
                    provide: CountryPickerService,
                    useFactory: countryPickerServiceFactory,
                    deps: [COUNTRY_PICKER_CONFIG, HttpClient]
                }
            ]
        };
    }
};
CountryPickerModule.ctorParameters = () => [
    { type: CountryPickerModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
CountryPickerModule = CountryPickerModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
            HttpClientModule
        ],
        declarations: [
            CountryPickerComponent
        ],
        exports: [
            CountryPickerComponent
        ]
    }),
    __param(0, Optional()), __param(0, SkipSelf())
], CountryPickerModule);

/**
 * Generated bundle index. Do not edit.
 */

export { COUNTRY_PICKER_CONFIG, COUNTRY_PICKER_CONFIG_DEFAULT, CountryPickerComponent, CountryPickerModule, CountryPickerService, countryPickerServiceFactory as ɵa };
//# sourceMappingURL=ngx-country-picker.js.map
