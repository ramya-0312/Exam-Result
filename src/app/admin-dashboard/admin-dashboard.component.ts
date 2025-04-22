import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone:false,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router:Router){}

  logout(){

  }
  confirmLogout(){
    this.router.navigate(['/admin-login'])
  }

}

