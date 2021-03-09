import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewliveofferComponent } from './viewliveoffer.component';

describe('ViewliveofferComponent', () => {
  let component: ViewliveofferComponent;
  let fixture: ComponentFixture<ViewliveofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewliveofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewliveofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
