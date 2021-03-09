import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebaraccountComponent } from './sidebaraccount.component';

describe('SidebaraccountComponent', () => {
  let component: SidebaraccountComponent;
  let fixture: ComponentFixture<SidebaraccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebaraccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebaraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
