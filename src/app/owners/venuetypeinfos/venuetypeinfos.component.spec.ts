import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuetypeinfosComponent } from './venuetypeinfos.component';

describe('VenuetypeinfosComponent', () => {
  let component: VenuetypeinfosComponent;
  let fixture: ComponentFixture<VenuetypeinfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuetypeinfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuetypeinfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
