import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemofferComponent } from './redeemoffer.component';

describe('RedeemofferComponent', () => {
  let component: RedeemofferComponent;
  let fixture: ComponentFixture<RedeemofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
