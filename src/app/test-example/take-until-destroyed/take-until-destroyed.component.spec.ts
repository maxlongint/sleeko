import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeUntilDestroyedComponent } from './take-until-destroyed.component';

describe('TakeUntilDestroyedComponent', () => {
  let component: TakeUntilDestroyedComponent;
  let fixture: ComponentFixture<TakeUntilDestroyedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeUntilDestroyedComponent]
    });
    fixture = TestBed.createComponent(TakeUntilDestroyedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
