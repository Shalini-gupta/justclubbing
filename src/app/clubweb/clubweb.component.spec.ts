import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubwebComponent } from './clubweb.component';

describe('ClubwebComponent', () => {
  let component: ClubwebComponent;
  let fixture: ComponentFixture<ClubwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
