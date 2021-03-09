import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditvenuesComponent } from './editvenues.component';

describe('EditvenuesComponent', () => {
  let component: EditvenuesComponent;
  let fixture: ComponentFixture<EditvenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditvenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditvenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
