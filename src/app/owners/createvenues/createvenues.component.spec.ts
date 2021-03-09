import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevenuesComponent } from './createvenues.component';

describe('CreatevenuesComponent', () => {
  let component: CreatevenuesComponent;
  let fixture: ComponentFixture<CreatevenuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatevenuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatevenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
