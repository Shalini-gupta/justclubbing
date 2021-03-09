import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsdetailsComponent } from './eventsdetails.component';

describe('EventsdetailsComponent', () => {
  let component: EventsdetailsComponent;
  let fixture: ComponentFixture<EventsdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
