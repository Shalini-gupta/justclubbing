import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyyouridComponent } from './verifyyourid.component';

describe('VerifyyouridComponent', () => {
  let component: VerifyyouridComponent;
  let fixture: ComponentFixture<VerifyyouridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyyouridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyyouridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
