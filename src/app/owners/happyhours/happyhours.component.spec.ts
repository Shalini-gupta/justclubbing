import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HappyhoursComponent } from './happyhours.component';

describe('HappyhoursComponent', () => {
  let component: HappyhoursComponent;
  let fixture: ComponentFixture<HappyhoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HappyhoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HappyhoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
