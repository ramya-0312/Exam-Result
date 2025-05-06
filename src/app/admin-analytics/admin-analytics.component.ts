import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration,ChartType,ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
//import { ChartData, ChartType, ChartOptions } from 'chart.js';

interface SubjectData {
  subject: string;
  passCount: number;
  failCount: number;
}

interface StudentData {
  name: string;
  registerNumber: string;
  totalMarks: number;
  avatarUrl: string;
}

interface DepartmentData {
  department: string;
  topStudents: StudentData[];
  subjects: SubjectData[];
}

@Component({
  standalone:false,
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnInit {
  adminEmail: string = '';

  allSemestersData: DepartmentData[][] = [];
  selectedSemester: number = 1;
  selectedDepartment: string = '';
  semesters: number[] = [];
  departments: string[] = [];
  currentData: DepartmentData | null = null;
  topStudents:any;
  //chartOptions:any

  barChartType: ChartType = 'bar';
  donutChartType: ChartType = 'doughnut';

  barChartData: ChartData = {
    labels: [],
    datasets: []
  };

  donutChartData: ChartData  = {
    labels: [],
    datasets: []
  };

  chartOptions: any= {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      }
    }
  };

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData(): void {
    this.http.get<DepartmentData[][]>('http://localhost:8080/student/all-semesters?registerNumber=${storedReg}&dob=${storedDob}').subscribe({
      next: (data) => {
        this.allSemestersData = data;
        this.semesters = data.map((_, i) => i + 1);
        this.selectedSemester = this.semesters[0];

        const firstSemesterDepartments = data[0];
        this.departments = firstSemesterDepartments.map(d => d.department);
        this.selectedDepartment = this.departments[0];

        this.updateCurrentData();
        console.log("Semesters:", this.semesters);
console.log("Departments:", this.departments);
      },
      error: (err) => console.error('Error fetching analytics:', err)
    });
  }

  updateCurrentData(): void {
    const semesterIndex = this.selectedSemester - 1;
    const departmentData = this.allSemestersData[semesterIndex].find(
      dept => dept.department === this.selectedDepartment
    );
    this.currentData = departmentData || null;

    if (this.currentData) {
      // Bar chart: show first subject as default
      const firstSubject = this.currentData.subjects[0];
      this.barChartData = this.getBarData(firstSubject);

      // Donut chart: total pass/fail across all subjects
      this.donutChartData = this.getDonutData();
    }

  }

  getBarData(subject: SubjectData): ChartConfiguration<'bar'>['data'] {
    return {
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          label: subject.subject,
          data: [subject.passCount, subject.failCount],
          backgroundColor: ['#28a745', '#dc3545']
        }
      ]
    };
  }

  getDonutData(): ChartConfiguration<'doughnut'>['data'] {
    if (!this.currentData) return { labels: [], datasets: [] };

    let totalPass = 0, totalFail = 0;
    this.currentData.subjects.forEach(sub => {
      totalPass += sub.passCount;
      totalFail += sub.failCount;
    });

    return {
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          data: [totalPass, totalFail],
          backgroundColor: ['#198754', '#dc3545']
        }
      ]
    };
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
