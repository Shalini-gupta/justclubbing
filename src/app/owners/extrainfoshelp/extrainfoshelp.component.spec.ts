import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrainfoshelpComponent } from './extrainfoshelp.component';

describe('ExtrainfoshelpComponent', () => {
  let component: ExtrainfoshelpComponent;
  let fixture: ComponentFixture<ExtrainfoshelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrainfoshelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrainfoshelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
