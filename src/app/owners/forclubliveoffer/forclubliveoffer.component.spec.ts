import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForclubliveofferComponent } from './forclubliveoffer.component';

describe('ForclubliveofferComponent', () => {
  let component: ForclubliveofferComponent;
  let fixture: ComponentFixture<ForclubliveofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForclubliveofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForclubliveofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
