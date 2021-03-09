import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForclubnotifyComponent } from './forclubnotify.component';

describe('ForclubnotifyComponent', () => {
  let component: ForclubnotifyComponent;
  let fixture: ComponentFixture<ForclubnotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForclubnotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForclubnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
