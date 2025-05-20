import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) {
      return true;
    } else {
      alert('Unauthorized access. Please log in as admin.');
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}
