import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateResultComponent } from './admin-update-result.component';

describe('AdminUpdateResultComponent', () => {
  let component: AdminUpdateResultComponent;
  let fixture: ComponentFixture<AdminUpdateResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUpdateResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUpdateResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
