import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseqctrlComponent } from './licenseqctrl.component';

describe('LicenseqctrlComponent', () => {
  let component: LicenseqctrlComponent;
  let fixture: ComponentFixture<LicenseqctrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseqctrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseqctrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
