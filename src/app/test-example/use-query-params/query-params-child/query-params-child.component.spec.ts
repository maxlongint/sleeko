import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryParamsChildComponent } from './query-params-child.component';

describe('QueryParamsChildComponent', () => {
  let component: QueryParamsChildComponent;
  let fixture: ComponentFixture<QueryParamsChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryParamsChildComponent]
    });
    fixture = TestBed.createComponent(QueryParamsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
