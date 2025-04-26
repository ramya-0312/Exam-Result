import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyResetGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isVerified = localStorage.getItem('emailVerified') === 'true';

    if (isVerified) {
      return true;
    } else {
      this.router.navigate(['/forgot-password']);
      return false;
    }
  }
}
