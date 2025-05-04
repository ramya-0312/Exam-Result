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
    this.registerNumber = localStorage.getItem('registerNumber') || '';
    this.dob = localStorage.getItem('dob') || '';
    this.fetchChartData();
  }

  // fetchChartData() {
  //   if (!this.registerNumber || !this.dob || !this.selectedSemester) return;
    
  //   this.isLoading = true;
  //   // const url = 'http://localhost:8080/student/viewresult?registered=${this.registerNumber}&dob=${this.dob}&sem=${this.selectedSemester}';
  //   const url = `http://localhost:8080/student/viewresult?registered=${this.registerNumber}&dob=${this.dob}&sem=${this.selectedSemester}`;

  //   this.http.get<any>(url).subscribe({
  //     next: (response) => {
  //       const subjects = Object.keys(response);
  //       const marks = subjects.map(sub => response[sub]);
  //       this.chartData = {
  //         labels: subjects,
  //         datasets: [
  //           {
  //             label: 'Marks',
  //             data: marks,
  //             backgroundColor: '#007bff'
  //           }
  //         ]
  //       };
  //       this.isLoading = false;
  //     },
  //     error: () => {
  //       this.chartData = null;
  //       this.isLoading = false;
  //     }
  //   });
  // }
  fetchChartData(): void {
    if (!this.registerNumber || !this.dob || !this.semesters) return;

    this.isLoading = true;
    const url = `http://localhost:8080/student/viewresult?registered=${this.registerNumber}&dob=${this.dob}&sem=${this.semesters}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.status === 'OK') {
          // Map the response to create chart data
          const subjects = response.response.subjects.map((sub: any) => sub.name);
          const marks = response.response.subjects.map((sub: any) => parseInt(sub.marks, 10));

          this.chartData = {
            labels: subjects,
            datasets: [{
              label: 'Marks',
              data: marks,
              backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FF5733'], // Custom colors
            }]
          };

          this.isLoading = false;
        }
      },
      error: () => {
        this.chartData = {
          labels: [],
          datasets: [{
            data: [],
            backgroundColor: [],
          }]
        };
        this.isLoading = false;
      }
    });
  }
  confirmLogout() {
    localStorage.clear();
     this.router.navigate(['/home']);
   }
}
