import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-analytics',
  standalone: false,
  templateUrl: './admin-analytics.component.html',
  styleUrl: './admin-analytics.component.css'
})
export class AdminAnalyticsComponent {
  adminEmail: string = '';
  passPercentLabels: string[] = [];
  passPercentData: number[] = [];

  semesterLabels: string[] = [];
  semesterData: number[] = [];

  topStudentLabels: string[] = [];
  topStudentData: number[] = [];

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }
    this.getPassPercentage();
    this.getSemesterPerformance();
    this.getTopStudents();
  }

  getPassPercentage() {
    this.http.get<any>('http://localhost:8080/api/analytics/pass-percentage').subscribe(res => {
      this.passPercentLabels = res.subjects;
      this.passPercentData = res.percentages;
    });
  }

  getSemesterPerformance() {
    this.http.get<any>('http://localhost:8080/api/analytics/semester-performance').subscribe(res => {
      this.semesterLabels = res.semesters;
      this.semesterData = res.averages;
    });
  }

  getTopStudents() {
    this.http.get<any>('http://localhost:8080/api/analytics/top-students').subscribe(res => {
      this.topStudentLabels = res.names;
      this.topStudentData = res.marks;
    });
  }
confirmLogout() {
  localStorage.clear();
  this.router.navigate(['/admin-login']);
  }

}
