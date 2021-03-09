import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsliderimagesComponent } from './uploadsliderimages.component';

describe('UploadsliderimagesComponent', () => {
  let component: UploadsliderimagesComponent;
  let fixture: ComponentFixture<UploadsliderimagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadsliderimagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsliderimagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
