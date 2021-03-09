import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesofuseComponent } from './rulesofuse.component';

describe('RulesofuseComponent', () => {
  let component: RulesofuseComponent;
  let fixture: ComponentFixture<RulesofuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesofuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesofuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
