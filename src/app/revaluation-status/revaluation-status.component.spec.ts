import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevaluationStatusComponent } from './revaluation-status.component';

describe('RevaluationStatusComponent', () => {
  let component: RevaluationStatusComponent;
  let fixture: ComponentFixture<RevaluationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevaluationStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevaluationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
