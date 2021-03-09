import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditliveoffertimebasedComponent } from './editliveoffertimebased.component';

describe('EditliveoffertimebasedComponent', () => {
  let component: EditliveoffertimebasedComponent;
  let fixture: ComponentFixture<EditliveoffertimebasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditliveoffertimebasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditliveoffertimebasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
