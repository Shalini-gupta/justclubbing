import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsdetailsshwComponent } from './ticketsdetailsshw.component';

describe('TicketsdetailsshwComponent', () => {
  let component: TicketsdetailsshwComponent;
  let fixture: ComponentFixture<TicketsdetailsshwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsdetailsshwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsdetailsshwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
