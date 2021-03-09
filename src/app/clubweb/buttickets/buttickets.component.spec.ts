import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButticketsComponent } from './buttickets.component';

describe('ButticketsComponent', () => {
  let component: ButticketsComponent;
  let fixture: ComponentFixture<ButticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
