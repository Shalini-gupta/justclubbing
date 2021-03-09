import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditliveofferComponent } from './editliveoffer.component';

describe('EditliveofferComponent', () => {
  let component: EditliveofferComponent;
  let fixture: ComponentFixture<EditliveofferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditliveofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditliveofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
