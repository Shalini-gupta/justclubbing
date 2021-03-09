import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagevenuesComponent } from './managevenues.component';

describe('ManagevenuesComponent', () => {
  let component: ManagevenuesComponent;
  let fixture: ComponentFixture<ManagevenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagevenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
