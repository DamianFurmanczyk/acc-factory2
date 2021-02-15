import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CountryPickerService } from './country-picker.service';
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
tslib_1.__decorate([
    Input()
], CountryPickerComponent.prototype, "flag", void 0);
tslib_1.__decorate([
    Input()
], CountryPickerComponent.prototype, "setValue", void 0);
tslib_1.__decorate([
    Input()
], CountryPickerComponent.prototype, "setName", void 0);
tslib_1.__decorate([
    Input()
], CountryPickerComponent.prototype, "classes", void 0);
CountryPickerComponent = tslib_1.__decorate([
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
export { CountryPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvdW50cnktcGlja2VyLyIsInNvdXJjZXMiOlsiY291bnRyeS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFhaEUsSUFBYSxzQkFBc0IsR0FBbkM7SUFVRSxZQUNVLHFCQUEyQyxFQUMzQyxJQUF1QjtRQUR2QiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQzNDLFNBQUksR0FBSixJQUFJLENBQW1CO1FBVmpCLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDYixhQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxhQUFhLENBQUM7UUFDeEIsWUFBTyxHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFdkQsY0FBUyxHQUFlLEVBQUUsQ0FBQztRQU9oQyxJQUFJLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUM5RCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUU7YUFDdEMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVcsRUFBRSxDQUFXLEVBQUUsRUFBRTtnQkFDM0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNYLE9BQU8sQ0FBQyxDQUFDO2lCQUNWO2dCQUNELElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNYO2dCQUNELE9BQU8sQ0FBQyxDQUFDO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFhO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFTSxPQUFPLENBQUMsR0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDO0NBQ0YsQ0FBQTs7WUEvQmtDLG9CQUFvQjtZQUNyQyxpQkFBaUI7O0FBVnhCO0lBQVIsS0FBSyxFQUFFO29EQUFxQjtBQUNwQjtJQUFSLEtBQUssRUFBRTt3REFBMEI7QUFDekI7SUFBUixLQUFLLEVBQUU7dURBQWdDO0FBQy9CO0lBQVIsS0FBSyxFQUFFO3VEQUFzRDtBQUxuRCxzQkFBc0I7SUFYbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGdCQUFnQjtRQUMxQixRQUFRLEVBQUU7Ozs7OztHQU1UO1FBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLHNCQUFzQixDQTBDbEM7U0ExQ1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSUNvdW50cnkgfSBmcm9tICcuL2NvdW50cnkuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvdW50cnlQaWNrZXJTZXJ2aWNlIH0gZnJvbSAnLi9jb3VudHJ5LXBpY2tlci5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY291bnRyeS1waWNrZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgICAgPHNlbGVjdCBbY2xhc3NdPVwiY2xhc3Nlc1wiPlxuICAgICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IGMgb2YgY291bnRyaWVzXCIgW3ZhbHVlXT1cImdldFZhbHVlKGMpXCI+XG4gICAgICAgICAgICAgIDxpbWcgKm5nSWY9XCJmbGFnXCIgW3NyY109XCJiYXNlVXJsICsgYy5jY2EzLnRvTG93ZXJDYXNlKCkgKyAnLnN2ZydcIj57eyBnZXROYW1lKGMpIH19XG4gICAgICAgICAgPC9vcHRpb24+XG4gICAgICA8L3NlbGVjdD5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENvdW50cnlQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBmbGFnID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXRWYWx1ZSA9ICdjY2EzJztcbiAgQElucHV0KCkgcHVibGljIHNldE5hbWUgPSAnbmFtZS5jb21tb24nO1xuICBASW5wdXQoKSBwdWJsaWMgY2xhc3NlcyA9IFsnZm9ybS1jb250cm9sJywgJ2Zvcm0tY29udHJvbC1zbSddO1xuXG4gIHB1YmxpYyBjb3VudHJpZXM6IElDb3VudHJ5W10gPSBbXTtcbiAgcHVibGljIGJhc2VVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9jb3VudHJ5UGlja2VyU2VydmljZTogQ291bnRyeVBpY2tlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgdGhpcy5iYXNlVXJsID0gX2NvdW50cnlQaWNrZXJTZXJ2aWNlLmdldEJhc2VVcmwoKSArICdkYXRhLyc7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY291bnRyeVBpY2tlclNlcnZpY2UuZ2V0Q291bnRyaWVzKClcbiAgICAgIC5zdWJzY3JpYmUoY291bnRyaWVzID0+IHtcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBjb3VudHJpZXMuc29ydCgoYTogSUNvdW50cnksIGI6IElDb3VudHJ5KSA9PiB7XG4gICAgICAgICAgbGV0IG5hID0gdGhpcy5nZXROYW1lKGEpO1xuICAgICAgICAgIGxldCBuYiA9IHRoaXMuZ2V0TmFtZShiKTtcbiAgICAgICAgICBpZiAobmEgPiBuYikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChuYSA8IG5iKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VmFsdWUob2JqOiBJQ291bnRyeSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2V0VmFsdWUuc3BsaXQoJy4nKS5yZWR1Y2UoKG8sIGkpID0+IG9baV0sIG9iaik7XG4gIH1cblxuICBwdWJsaWMgZ2V0TmFtZShvYmo6IElDb3VudHJ5KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zZXROYW1lLnNwbGl0KCcuJykucmVkdWNlKChvLCBpKSA9PiBvW2ldLCBvYmopO1xuICB9XG59XG4iXX0=