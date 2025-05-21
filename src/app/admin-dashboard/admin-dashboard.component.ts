import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  adminEmail:string='';
  constructor(private router: Router, private authService: AuthService,private location:Location) {}

  ngOnInit(): void {
    const storedEmail=localStorage.getItem('adminEmail');
    if(storedEmail){
      this.adminEmail=storedEmail;
    }
   history.pushState(null, '', location.href);
   window.onpopstate = () => {
    if (!this.authService.isAdminLoggedIn()) {
      this.router.navigate(['/admin-login'],{replaceUrl:true});
    }


  }}

  logout() {
    // Clear admin credentials and navigate to the login page
    this.authService.clearAdminCredentials();
    this.router.navigate(['/admin-login']);
  }

  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
