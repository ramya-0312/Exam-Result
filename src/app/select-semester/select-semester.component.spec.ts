import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSemesterComponent } from './select-semester.component';

describe('SelectSemesterComponent', () => {
  let component: SelectSemesterComponent;
  let fixture: ComponentFixture<SelectSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSemesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
