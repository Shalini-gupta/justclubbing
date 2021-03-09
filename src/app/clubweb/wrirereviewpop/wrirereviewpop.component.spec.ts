import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrirereviewpopComponent } from './wrirereviewpop.component';

describe('WrirereviewpopComponent', () => {
  let component: WrirereviewpopComponent;
  let fixture: ComponentFixture<WrirereviewpopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrirereviewpopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrirereviewpopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
