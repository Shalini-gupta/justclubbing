import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuedetailsComponent } from './venuedetails.component';

describe('VenuedetailsComponent', () => {
  let component: VenuedetailsComponent;
  let fixture: ComponentFixture<VenuedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuedetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
