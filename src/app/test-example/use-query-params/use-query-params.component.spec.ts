import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseQueryParamsComponent } from './use-query-params.component';

describe('UseQueryParamsComponent', () => {
  let component: UseQueryParamsComponent;
  let fixture: ComponentFixture<UseQueryParamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UseQueryParamsComponent]
    });
    fixture = TestBed.createComponent(UseQueryParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
