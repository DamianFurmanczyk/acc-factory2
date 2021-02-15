import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieConsentBarComponent } from './cookie-consent-bar.component';

describe('CookieConsentBarComponent', () => {
  let component: CookieConsentBarComponent;
  let fixture: ComponentFixture<CookieConsentBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieConsentBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieConsentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
