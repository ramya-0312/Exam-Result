import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
})
export class AdminAnalyticsComponent implements OnInit {
  adminEmail: string = '';
  allSemestersData: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }
    this.http.get<any[]>('/api/admin/analytics/all').subscribe(res => {
      this.allSemestersData = res;
    });
  }

  getBarData(subject: any, dept: string, sem: number) {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [{
        label: `${subject.subject} - ${dept} - Sem ${sem}`,
        data: [subject.pass, subject.fail],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    };
  }

  getDonutData(subject: any) {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [{
        data: [subject.pass, subject.fail],
        backgroundColor: ['#81c784', '#e57373']
      }]
    };
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
