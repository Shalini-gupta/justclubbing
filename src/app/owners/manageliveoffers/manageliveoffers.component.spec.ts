import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageliveoffersComponent } from './manageliveoffers.component';

describe('ManageliveoffersComponent', () => {
  let component: ManageliveoffersComponent;
  let fixture: ComponentFixture<ManageliveoffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageliveoffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageliveoffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
