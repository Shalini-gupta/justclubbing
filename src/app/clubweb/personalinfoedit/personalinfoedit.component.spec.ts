import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalinfoeditComponent } from './personalinfoedit.component';

describe('PersonalinfoeditComponent', () => {
  let component: PersonalinfoeditComponent;
  let fixture: ComponentFixture<PersonalinfoeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalinfoeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalinfoeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
