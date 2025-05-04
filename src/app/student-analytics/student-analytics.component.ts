import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.css']
})
export class StudentAnalyticsComponent implements OnInit {
  registerNumber: string = '';
  dob: string = '';
  selectedSemester: number = 1;
  semesters: number[] = [1, 2, 3, 4];
  isLoading = false;
  chartData: any;
  chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {
    this.registerNumber = localStorage.getItem('studentRegisterNumber') || '';
    this.dob = localStorage.getItem('studentDOB') || '';
    this.fetchChartData();
  }

  fetchChartData() {
    if (!this.registerNumber || !this.dob || !this.selectedSemester) return;

    this.isLoading = true;
    const url = 'http://localhost:8080/api/results/student-marks-chart?registerNumber=${this.registerNumber}&dob=${this.dob}&semester=${this.selectedSemester}';
    this.http.get<any>(url).subscribe({
      next: (response) => {
        const subjects = Object.keys(response);
        const marks = subjects.map(sub => response[sub]);
        this.chartData = {
          labels: subjects,
          datasets: [
            {
              label: 'Marks',
              data: marks,
              backgroundColor: '#007bff'
            }
          ]
        };
        this.isLoading = false;
      },
      error: () => {
        this.chartData = null;
        this.isLoading = false;
      }
    });
  }
  confirmLogout() {
    localStorage.clear();
     this.router.navigate(['/home']);
   }
}
