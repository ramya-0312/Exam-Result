import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRevaluationComponent } from './admin-revaluation.component';

describe('AdminRevaluationComponent', () => {
  let component: AdminRevaluationComponent;
  let fixture: ComponentFixture<AdminRevaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRevaluationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
