import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingfunctioneventComponent } from './weddingfunctionevent.component';

describe('WeddingfunctioneventComponent', () => {
  let component: WeddingfunctioneventComponent;
  let fixture: ComponentFixture<WeddingfunctioneventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingfunctioneventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingfunctioneventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
