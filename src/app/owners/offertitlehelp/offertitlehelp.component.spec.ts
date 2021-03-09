import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertitlehelpComponent } from './offertitlehelp.component';

describe('OffertitlehelpComponent', () => {
  let component: OffertitlehelpComponent;
  let fixture: ComponentFixture<OffertitlehelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffertitlehelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertitlehelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
