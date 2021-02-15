import { __decorate, __param } from 'tslib';
import { InjectionToken, Inject, Injectable, ChangeDetectorRef, Input, Component, ChangeDetectionStrategy, Optional, SkipSelf, NgModule } from '@angular/core';
import { HttpResponse, HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

var COUNTRY_PICKER_CONFIG = new InjectionToken('countrypicker.config');
var COUNTRY_PICKER_CONFIG_DEFAULT = {
    baseUrl: 'assets/',
    filename: 'countries.json',
};

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
    CountryPickerService = CountryPickerService_1 = __decorate([
        Injectable(),
        __param(0, Inject(COUNTRY_PICKER_CONFIG))
    ], CountryPickerService);
    return CountryPickerService;
}());

var CountryPickerComponent = /** @class */ (function () {
    function CountryPickerComponent(_countryPickerService, _cdr) {
        this._countryPickerService = _countryPickerService;
        this._cdr = _cdr;
        this.flag = false;
        this.setValue = 'cca3';
        this.setName = 'name.common';
        this.classes = ['form-control', 'form-control-sm'];
        this.countries = [];
        this.baseUrl = _countryPickerService.getBaseUrl() + 'data/';
    }
    CountryPickerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._countryPickerService.getCountries()
            .subscribe(function (countries) {
            _this.countries = countries.sort(function (a, b) {
                var na = _this.getName(a);
                var nb = _this.getName(b);
                if (na > nb) {
                    return 1;
                }
                if (na < nb) {
                    return -1;
                }
                return 0;
            });
            _this._cdr.markForCheck();
        });
    };
    CountryPickerComponent.prototype.getValue = function (obj) {
        return this.setValue.split('.').reduce(function (o, i) { return o[i]; }, obj);
    };
    CountryPickerComponent.prototype.getName = function (obj) {
        return this.setName.split('.').reduce(function (o, i) { return o[i]; }, obj);
    };
    CountryPickerComponent.ctorParameters = function () { return [
        { type: CountryPickerService },
        { type: ChangeDetectorRef }
    ]; };
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
            template: "\n      <select [class]=\"classes\">\n          <option *ngFor=\"let c of countries\" [value]=\"getValue(c)\">\n              <img *ngIf=\"flag\" [src]=\"baseUrl + c.cca3.toLowerCase() + '.svg'\">{{ getName(c) }}\n          </option>\n      </select>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CountryPickerComponent);
    return CountryPickerComponent;
}());

function countryPickerServiceFactory(config, http) {
    return new CountryPickerService(config, http);
}
var CountryPickerModule = /** @class */ (function () {
    function CountryPickerModule(parentModule) {
        if (parentModule) {
            throw new Error('CountryPickerModule is already loaded. Import it in the AppModule only');
        }
    }
    CountryPickerModule_1 = CountryPickerModule;
    CountryPickerModule.forRoot = function (providedConfig) {
        if (providedConfig === void 0) { providedConfig = COUNTRY_PICKER_CONFIG_DEFAULT; }
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
    };
    var CountryPickerModule_1;
    CountryPickerModule.ctorParameters = function () { return [
        { type: CountryPickerModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
    ]; };
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
    return CountryPickerModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { COUNTRY_PICKER_CONFIG, COUNTRY_PICKER_CONFIG_DEFAULT, CountryPickerComponent, CountryPickerModule, CountryPickerService, countryPickerServiceFactory as ɵa };
//# sourceMappingURL=ngx-country-picker.js.map
