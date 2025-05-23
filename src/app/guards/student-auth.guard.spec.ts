import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { StudentAuthGuard } from './student-auth.guard';

describe('StudentAuthGuard', () => {
  let guard: StudentAuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        StudentAuthGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(StudentAuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
