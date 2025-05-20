import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginBlockGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminEmail = localStorage.getItem('adminEmail');

    if (adminEmail) {
      return true;
    } else {
      alert('Unauthorized access. Please log in as admin.');
      this.router.navigate(['/admin-dashboard']);
      return false;
    }// allow access to login
  }
}
