import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrottleTimeComponent } from './throttle-time.component';

describe('ThrottleTimeComponent', () => {
  let component: ThrottleTimeComponent;
  let fixture: ComponentFixture<ThrottleTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThrottleTimeComponent]
    });
    fixture = TestBed.createComponent(ThrottleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
