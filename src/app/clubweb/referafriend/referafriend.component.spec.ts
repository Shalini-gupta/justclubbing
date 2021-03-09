import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferafriendComponent } from './referafriend.component';

describe('ReferafriendComponent', () => {
  let component: ReferafriendComponent;
  let fixture: ComponentFixture<ReferafriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferafriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferafriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
