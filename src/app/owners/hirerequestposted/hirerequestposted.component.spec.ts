import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirerequestpostedComponent } from './hirerequestposted.component';

describe('HirerequestpostedComponent', () => {
  let component: HirerequestpostedComponent;
  let fixture: ComponentFixture<HirerequestpostedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirerequestpostedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirerequestpostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
