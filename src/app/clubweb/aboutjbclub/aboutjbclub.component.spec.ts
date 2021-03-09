import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutjbclubComponent } from './aboutjbclub.component';

describe('AboutjbclubComponent', () => {
  let component: AboutjbclubComponent;
  let fixture: ComponentFixture<AboutjbclubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutjbclubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutjbclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
