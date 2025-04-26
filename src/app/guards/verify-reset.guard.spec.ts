import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { VerifyResetGuard } from './verify-reset.guard';

describe('VerifyResetGuard', () => {
  let guard: VerifyResetGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        VerifyResetGuard,
        { provide: Router, useValue: spy }
      ]
    });

    guard = TestBed.inject(VerifyResetGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
