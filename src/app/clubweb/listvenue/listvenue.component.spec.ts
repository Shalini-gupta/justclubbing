import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListvenueComponent } from './listvenue.component';

describe('ListvenueComponent', () => {
  let component: ListvenueComponent;
  let fixture: ComponentFixture<ListvenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListvenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListvenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
