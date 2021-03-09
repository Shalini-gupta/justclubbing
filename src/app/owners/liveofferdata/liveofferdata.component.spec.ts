import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveofferdataComponent } from './liveofferdata.component';

describe('LiveofferdataComponent', () => {
  let component: LiveofferdataComponent;
  let fixture: ComponentFixture<LiveofferdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveofferdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveofferdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
