import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForclubeventsComponent } from './forclubevents.component';

describe('ForclubeventsComponent', () => {
  let component: ForclubeventsComponent;
  let fixture: ComponentFixture<ForclubeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForclubeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForclubeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
