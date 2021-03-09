import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderloginbackbtnComponent } from './headerloginbackbtn.component';

describe('HeaderloginbackbtnComponent', () => {
  let component: HeaderloginbackbtnComponent;
  let fixture: ComponentFixture<HeaderloginbackbtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderloginbackbtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderloginbackbtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
