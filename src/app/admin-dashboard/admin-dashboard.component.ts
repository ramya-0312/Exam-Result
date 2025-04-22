import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: false,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // If admin credentials are not in localStorage, navigate to login page
    if (!this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin-login']);
    }
  }

  logout() {
    // Clear admin credentials and navigate to the login page
    this.authService.clearAdminCredentials();
    this.router.navigate(['/admin-login']);
  }

  confirmLogout() {
    this.router.navigate(['/admin-login']);
  }
}
