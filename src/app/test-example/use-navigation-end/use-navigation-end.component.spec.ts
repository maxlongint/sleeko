import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseNavigationEndComponent } from './use-navigation-end.component';

describe('UseNavigationEndComponent', () => {
  let component: UseNavigationEndComponent;
  let fixture: ComponentFixture<UseNavigationEndComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseNavigationEndComponent]
    });
    fixture = TestBed.createComponent(UseNavigationEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
