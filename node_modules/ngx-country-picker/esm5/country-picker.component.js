import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CountryPickerService } from './country-picker.service';
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
            template: "\n      <select [class]=\"classes\">\n          <option *ngFor=\"let c of countries\" [value]=\"getValue(c)\">\n              <img *ngIf=\"flag\" [src]=\"baseUrl + c.cca3.toLowerCase() + '.svg'\">{{ getName(c) }}\n          </option>\n      </select>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], CountryPickerComponent);
    return CountryPickerComponent;
}());
export { CountryPickerComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRyeS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvdW50cnktcGlja2VyLyIsInNvdXJjZXMiOlsiY291bnRyeS1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFhaEU7SUFVRSxnQ0FDVSxxQkFBMkMsRUFDM0MsSUFBdUI7UUFEdkIsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjtRQUMzQyxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQVZqQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsYUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNsQixZQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3hCLFlBQU8sR0FBRyxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZELGNBQVMsR0FBZSxFQUFFLENBQUM7UUFPaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDOUQsQ0FBQztJQUVNLHlDQUFRLEdBQWY7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFO2FBQ3RDLFNBQVMsQ0FBQyxVQUFBLFNBQVM7WUFDbEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBVyxFQUFFLENBQVc7Z0JBQ3ZELElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDWCxPQUFPLENBQUMsQ0FBQztpQkFDVjtnQkFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxPQUFPLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx5Q0FBUSxHQUFmLFVBQWdCLEdBQWE7UUFDM0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFKLENBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU0sd0NBQU8sR0FBZCxVQUFlLEdBQWE7UUFDMUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFKLENBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxDQUFDOztnQkE5QmdDLG9CQUFvQjtnQkFDckMsaUJBQWlCOztJQVZ4QjtRQUFSLEtBQUssRUFBRTt3REFBcUI7SUFDcEI7UUFBUixLQUFLLEVBQUU7NERBQTBCO0lBQ3pCO1FBQVIsS0FBSyxFQUFFOzJEQUFnQztJQUMvQjtRQUFSLEtBQUssRUFBRTsyREFBc0Q7SUFMbkQsc0JBQXNCO1FBWGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsUUFBUSxFQUFFLGdRQU1UO1lBQ0QsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQztPQUNXLHNCQUFzQixDQTBDbEM7SUFBRCw2QkFBQztDQUFBLEFBMUNELElBMENDO1NBMUNZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IElDb3VudHJ5IH0gZnJvbSAnLi9jb3VudHJ5LmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb3VudHJ5UGlja2VyU2VydmljZSB9IGZyb20gJy4vY291bnRyeS1waWNrZXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NvdW50cnktcGlja2VyJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDxzZWxlY3QgW2NsYXNzXT1cImNsYXNzZXNcIj5cbiAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjIG9mIGNvdW50cmllc1wiIFt2YWx1ZV09XCJnZXRWYWx1ZShjKVwiPlxuICAgICAgICAgICAgICA8aW1nICpuZ0lmPVwiZmxhZ1wiIFtzcmNdPVwiYmFzZVVybCArIGMuY2NhMy50b0xvd2VyQ2FzZSgpICsgJy5zdmcnXCI+e3sgZ2V0TmFtZShjKSB9fVxuICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgPC9zZWxlY3Q+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDb3VudHJ5UGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwdWJsaWMgZmxhZyA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgc2V0VmFsdWUgPSAnY2NhMyc7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXROYW1lID0gJ25hbWUuY29tbW9uJztcbiAgQElucHV0KCkgcHVibGljIGNsYXNzZXMgPSBbJ2Zvcm0tY29udHJvbCcsICdmb3JtLWNvbnRyb2wtc20nXTtcblxuICBwdWJsaWMgY291bnRyaWVzOiBJQ291bnRyeVtdID0gW107XG4gIHB1YmxpYyBiYXNlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY291bnRyeVBpY2tlclNlcnZpY2U6IENvdW50cnlQaWNrZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHRoaXMuYmFzZVVybCA9IF9jb3VudHJ5UGlja2VyU2VydmljZS5nZXRCYXNlVXJsKCkgKyAnZGF0YS8nO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvdW50cnlQaWNrZXJTZXJ2aWNlLmdldENvdW50cmllcygpXG4gICAgICAuc3Vic2NyaWJlKGNvdW50cmllcyA9PiB7XG4gICAgICAgIHRoaXMuY291bnRyaWVzID0gY291bnRyaWVzLnNvcnQoKGE6IElDb3VudHJ5LCBiOiBJQ291bnRyeSkgPT4ge1xuICAgICAgICAgIGxldCBuYSA9IHRoaXMuZ2V0TmFtZShhKTtcbiAgICAgICAgICBsZXQgbmIgPSB0aGlzLmdldE5hbWUoYik7XG4gICAgICAgICAgaWYgKG5hID4gbmIpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobmEgPCBuYikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFZhbHVlKG9iajogSUNvdW50cnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNldFZhbHVlLnNwbGl0KCcuJykucmVkdWNlKChvLCBpKSA9PiBvW2ldLCBvYmopO1xuICB9XG5cbiAgcHVibGljIGdldE5hbWUob2JqOiBJQ291bnRyeSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2V0TmFtZS5zcGxpdCgnLicpLnJlZHVjZSgobywgaSkgPT4gb1tpXSwgb2JqKTtcbiAgfVxufVxuIl19