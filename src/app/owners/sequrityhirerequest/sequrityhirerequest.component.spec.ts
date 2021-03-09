import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequrityhirerequestComponent } from './sequrityhirerequest.component';

describe('SequrityhirerequestComponent', () => {
  let component: SequrityhirerequestComponent;
  let fixture: ComponentFixture<SequrityhirerequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequrityhirerequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequrityhirerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
