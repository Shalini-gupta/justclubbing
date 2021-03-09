import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageforeventlogComponent } from './messageforeventlog.component';

describe('MessageforeventlogComponent', () => {
  let component: MessageforeventlogComponent;
  let fixture: ComponentFixture<MessageforeventlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageforeventlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageforeventlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
