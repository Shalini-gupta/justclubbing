import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentslcComponent } from './paymentslc.component';

describe('PaymentslcComponent', () => {
  let component: PaymentslcComponent;
  let fixture: ComponentFixture<PaymentslcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentslcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentslcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
