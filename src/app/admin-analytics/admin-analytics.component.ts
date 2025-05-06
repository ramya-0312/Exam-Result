import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {

  allSemestersData: any[] = [];
  adminEmail: string = '';
  registerNumber: string = '';
  dob: string = '';
  studentName: string = '';
  department: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.adminEmail = localStorage.getItem('adminEmail') || 'admin@example.com';

    this.fetchAnalyticsData();
    this.fetchStudentInfo();  // optional – depends on where you're showing student info
  }

  fetchAnalyticsData(): void {
    this.http.get<any[]>('http://localhost:8080/student/all-semesters').subscribe({
      next: (data) => {
        this.allSemestersData = data;
      },
      error: (err) => {
        console.error('Error fetching analytics:', err);
      }
    });
  }

  fetchStudentInfo(): void {
    // Optional – only if you want to show student info at the top
    const storedReg = localStorage.getItem('studentRegisterNumber');
    const storedDob = localStorage.getItem('studentDOB');

    if (storedReg && storedDob) {
      this.registerNumber = storedReg;
      this.dob = storedDob;

      this.http.get<any>(`http://localhost:8080/student/all-semesters?registerNumber=${storedReg}&dob=${storedDob}`)
        .subscribe({
          next: (res) => {
            this.studentName = res.name;
            this.department = res.department;
          },
          error: (err) => {
            console.error('Failed to load student info:', err);
          }
        });
    }
  }

  // Method to get Bar Chart data for a subject
  getBarData(subject: any, department: string, semester: number): ChartConfiguration<'bar'>['data'] {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          label: `${subject.subject} - Sem ${semester}`,
          data: [subject.passCount, subject.failCount],
          backgroundColor: ['#28a745', '#dc3545'],
        }
      ]
    };
  }

  // Method to get Donut Chart data for a subject
  getDonutData(subject: any): ChartConfiguration<'doughnut'>['data'] {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          data: [subject.passCount, subject.failCount],
          backgroundColor: ['#198754', '#dc3545'],
        }
      ]
    };
  }

  confirmLogout(): void {
    localStorage.removeItem('adminEmail');
    // navigate to home or login
    window.location.href = '/';
  }
}
