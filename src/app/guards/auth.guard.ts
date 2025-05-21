import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  setAdminCredentials(email: string, password: string) {
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
  }

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('adminEmail');
    if (!isLoggedIn) {
      this.router.navigate(['/admin-login']);
      return false;
    }
    return true;
  }
}
