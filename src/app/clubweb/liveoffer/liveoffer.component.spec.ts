import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveofferComponent } from './liveoffer.component';

describe('LiveofferComponent', () => {
  let component: LiveofferComponent;
  let fixture: ComponentFixture<LiveofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
