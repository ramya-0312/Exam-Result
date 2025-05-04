import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {
  adminEmail: string = '';
  semester: number = 1;
departments: string[] = [];
analyticsData: any = {};
isLoading = false;

 constructor(
    private router: Router,
    private http:HttpClient
  ) {}

fetchAnalytics() {
  this.isLoading = true;
  this.http.get<any>('http://localhost:8080/api/results/department-pass-fail?semester=${this.semester}')
    .subscribe({
      next: (data) => {
        this.analyticsData = data;
        this.departments = Object.keys(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
}

getPieData(dept: string) {
  const entry = this.analyticsData[dept];
  return {
    labels: ['Pass', 'Fail'],
    datasets: [{
      data: [entry.pass, entry.fail],
      backgroundColor: ['#28a745', '#dc3545']
    }]
  };
}
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
