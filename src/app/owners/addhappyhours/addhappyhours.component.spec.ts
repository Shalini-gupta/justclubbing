import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhappyhoursComponent } from './addhappyhours.component';

describe('AddhappyhoursComponent', () => {
  let component: AddhappyhoursComponent;
  let fixture: ComponentFixture<AddhappyhoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhappyhoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhappyhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
