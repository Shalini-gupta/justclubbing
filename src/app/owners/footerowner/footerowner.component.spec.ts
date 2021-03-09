import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterownerComponent } from './footerowner.component';

describe('FooterownerComponent', () => {
  let component: FooterownerComponent;
  let fixture: ComponentFixture<FooterownerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterownerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
