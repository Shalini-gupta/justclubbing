import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateliveofferComponent } from './createliveoffer.component';

describe('CreateliveofferComponent', () => {
  let component: CreateliveofferComponent;
  let fixture: ComponentFixture<CreateliveofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateliveofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateliveofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
