import * as tslib_1 from "tslib";
var CountryPickerModule_1;
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { COUNTRY_PICKER_CONFIG, COUNTRY_PICKER_CONFIG_DEFAULT } from './country-picker.config';
import { CountryPickerService } from './country-picker.service';
import { CountryPickerComponent } from './country-picker.component';
export function countryPickerServiceFactory(config, http) {
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
CountryPickerModule = CountryPickerModule_1 = tslib_1.__decorate([
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
    tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf())
], CountryPickerModule);
export { CountryPickerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1waWNrZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvdW50cnktcGlja2VyLyIsInNvdXJjZXMiOlsiY291bnRyeS1waWNrZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSw2QkFBNkIsRUFBdUIsTUFBTSx5QkFBeUIsQ0FBQztBQUNwSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVwRSxNQUFNLHNDQUFzQyxNQUEyQixFQUFFLElBQWdCO0lBQ3ZGLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQWNELElBQWEsbUJBQW1CLDJCQUFoQztJQWdCRSxZQUFvQyxZQUFpQztRQUNuRSxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7U0FDM0Y7SUFDSCxDQUFDO0lBbEJNLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUJBQXNDLDZCQUE2QjtRQUN2RixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFtQjtZQUM3QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztnQkFDMUQ7b0JBQ0UsT0FBTyxFQUFFLG9CQUFvQjtvQkFDN0IsVUFBVSxFQUFFLDJCQUEyQjtvQkFDdkMsSUFBSSxFQUFFLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDO2lCQUMxQzthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FPRixDQUFBOztZQUxtRCxtQkFBbUIsdUJBQXhELFFBQVEsWUFBSSxRQUFROztBQWhCdEIsbUJBQW1CO0lBWi9CLFFBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRTtZQUNQLFlBQVk7WUFDWixnQkFBZ0I7U0FDakI7UUFDRCxZQUFZLEVBQUU7WUFDWixzQkFBc0I7U0FDdkI7UUFDRCxPQUFPLEVBQUU7WUFDUCxzQkFBc0I7U0FDdkI7S0FDRixDQUFDO0lBaUJhLG1CQUFBLFFBQVEsRUFBRSxDQUFBLEVBQUUsbUJBQUEsUUFBUSxFQUFFLENBQUE7R0FoQnhCLG1CQUFtQixDQXFCL0I7U0FyQlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDT1VOVFJZX1BJQ0tFUl9DT05GSUcsIENPVU5UUllfUElDS0VSX0NPTkZJR19ERUZBVUxULCBDb3VudHJ5UGlja2VyQ29uZmlnIH0gZnJvbSAnLi9jb3VudHJ5LXBpY2tlci5jb25maWcnO1xuaW1wb3J0IHsgQ291bnRyeVBpY2tlclNlcnZpY2UgfSBmcm9tICcuL2NvdW50cnktcGlja2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ291bnRyeVBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vY291bnRyeS1waWNrZXIuY29tcG9uZW50JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvdW50cnlQaWNrZXJTZXJ2aWNlRmFjdG9yeShjb25maWc6IENvdW50cnlQaWNrZXJDb25maWcsIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgcmV0dXJuIG5ldyBDb3VudHJ5UGlja2VyU2VydmljZShjb25maWcsIGh0dHApO1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ291bnRyeVBpY2tlckNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQ291bnRyeVBpY2tlckNvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvdW50cnlQaWNrZXJNb2R1bGUge1xuXG4gIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChwcm92aWRlZENvbmZpZzogQ291bnRyeVBpY2tlckNvbmZpZyA9IENPVU5UUllfUElDS0VSX0NPTkZJR19ERUZBVUxUKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb3VudHJ5UGlja2VyTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb3VudHJ5UGlja2VyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtwcm92aWRlOiBDT1VOVFJZX1BJQ0tFUl9DT05GSUcsIHVzZVZhbHVlOiBwcm92aWRlZENvbmZpZ30sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDb3VudHJ5UGlja2VyU2VydmljZSxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjb3VudHJ5UGlja2VyU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgZGVwczogW0NPVU5UUllfUElDS0VSX0NPTkZJRywgSHR0cENsaWVudF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IENvdW50cnlQaWNrZXJNb2R1bGUpIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdW50cnlQaWNrZXJNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpdCBpbiB0aGUgQXBwTW9kdWxlIG9ubHknKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==