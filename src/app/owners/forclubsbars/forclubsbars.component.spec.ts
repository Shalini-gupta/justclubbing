import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForclubsbarsComponent } from './forclubsbars.component';

describe('ForclubsbarsComponent', () => {
  let component: ForclubsbarsComponent;
  let fixture: ComponentFixture<ForclubsbarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForclubsbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForclubsbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
