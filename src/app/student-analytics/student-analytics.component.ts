import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChartData } from 'chart.js';

@Component({
  standalone:false,
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.css']
})

export class StudentAnalyticsComponent implements OnInit {
  marks: { [subject: string]: number}={};
  registerNumber = '';
  dob = '';
  semester=[];


  analyticsData: any[] = [];

  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  donutChartData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.fetchAnalytics();
  }

  fetchAnalytics() {
    this.http.post<any[]>('http://localhost:8080/api/analytics', {
      registerNumber: this.registerNumber,
      dob: this.dob
    }).subscribe(data => {
      this.analyticsData = data;
      this.prepareBarChart();
      this.prepareDonutChart();
    });
  }

  prepareBarChart() {
    const subjects = ['Tamil', 'English', 'Mathematics', 'Science', 'Social Science'];

    this.barChartData.labels = this.analyticsData.map(d => `Sem ${d.semester}`);
    this.barChartData.datasets = subjects.map(subject => ({
      label: subject,
      data: this.analyticsData.map(d => d.subjectMarks[subject])
    }));
  }

  prepareDonutChart() {
    this.donutChartData.labels = this.analyticsData.map(d => `Sem ${d.semester}`);
    this.donutChartData.datasets = [{

      label: 'Total Marks',
      data: this.analyticsData.map(d => {
        const sum = Object.values(this.marks).reduce((acc: number, val: unknown) => acc + Number(val), 0);
        return Math.round((sum / 500) * 100); // Percentage
      }),
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
    }];
  }
  confirmLogout() {
    localStorage.clear();
     this.router.navigate(['/home']);
   }
}
