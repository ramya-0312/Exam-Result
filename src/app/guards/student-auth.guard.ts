import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class StudentAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isAuthenticated = localStorage.getItem('studentAuth') === 'true';
    console.log('Guard Triggered - studentAuth:', isAuthenticated);
    if (!isAuthenticated) {
      this.router.navigate(['/student-result']);
      return false;
    }
    return true;
  }
}
