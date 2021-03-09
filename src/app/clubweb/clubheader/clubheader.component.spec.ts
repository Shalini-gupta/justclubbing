import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubheaderComponent } from './clubheader.component';

describe('ClubheaderComponent', () => {
  let component: ClubheaderComponent;
  let fixture: ComponentFixture<ClubheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
