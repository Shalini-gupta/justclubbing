import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeddingfuncafterlogdetailComponent } from './weddingfuncafterlogdetail.component';

describe('WeddingfuncafterlogdetailComponent', () => {
  let component: WeddingfuncafterlogdetailComponent;
  let fixture: ComponentFixture<WeddingfuncafterlogdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeddingfuncafterlogdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeddingfuncafterlogdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
