import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditevntsComponent } from './editevnts.component';

describe('EditevntsComponent', () => {
  let component: EditevntsComponent;
  let fixture: ComponentFixture<EditevntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditevntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditevntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
