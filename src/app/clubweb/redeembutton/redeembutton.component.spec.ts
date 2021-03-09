import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeembuttonComponent } from './redeembutton.component';

describe('RedeembuttonComponent', () => {
  let component: RedeembuttonComponent;
  let fixture: ComponentFixture<RedeembuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeembuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeembuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
