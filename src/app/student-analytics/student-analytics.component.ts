import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({standalone:false,
  selector: 'app-student-analytics',
  templateUrl: './student-analytics.component.html',
  styleUrls: ['./student-analytics.component.css']
})
export class StudentAnalyticsComponent implements OnInit {
  registerNumber = '';
  dob = '';
  semesters = [1, 2, 3, 4];
  isLoading = true;
  chartData: { [key: number]: any } = {};

  chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerNumber = localStorage.getItem('registerNumber') || '';
    this.dob = localStorage.getItem('dob') || '';
    this.fetchAllSemesters();
  }

  fetchAllSemesters(): void {
    if (!this.registerNumber || !this.dob) return;

    let loaded = 0;
    this.semesters.forEach(sem => {
      const semesters = [1, 2, 3, 4];
const semParam = semesters.join(',');
const url = `http://localhost:8080/student/viewresult?registered=${this.registerNumber}&dob=${this.dob}&sem=${semParam}`;


      this.http.get<any>(url).subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            const subjects = response.response.subjects.map((sub: any) => sub.name);
            const marks = response.response.subjects.map((sub: any) => parseInt(sub.marks, 10));
            this.chartData[sem] = {
              labels: subjects,
              datasets: [{
                label: 'Marks',
                data: marks,
                backgroundColor: '#007bff'
              }]
            };
          }
          loaded++;
          if (loaded === this.semesters.length) this.isLoading = false;
        },
        error: () => {
          this.chartData[sem] = {
            labels: [],
            datasets: []
          };
          loaded++;
          if (loaded === this.semesters.length) this.isLoading = false;
        }
      });
    });
  }

  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
