import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { ChartConfiguration,ChartType,ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { ChartData, ChartType, ChartOptions, ChartConfiguration } from 'chart.js';
import { Location } from '@angular/common';

interface GradeDistribution {
  A:number;
  B:number;
  c:number;
  D:number;
  U:number;
}
interface SubjectData {
  subject: string;
  passCount: number;
  failCount: number;
  grades: GradeDistribution;
}

interface StudentData {
  name: string;
  registerNumber: string;
  totalMarks: string;
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
  allBarCharts: { subject: string, chartData: ChartConfiguration<'bar'>['data'] }[] = [];

  allSemestersData: DepartmentData[] = [];
  selectedSemester: number = 1;
  selectedDepartment: string = '';
  semesters: number[] = [1,2,3,4];
  departments: string[] = ['EEE','CIVIL','CSE','MECH'];
  currentData: DepartmentData | null = null;
  topStudents:any;
  //chartOptions:any

  barChartType: ChartType = 'bar';
  donutChartType: ChartType = 'doughnut';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [ {
      label: 'Pass Percentage',
      data: [], // Update dynamically from backend
      backgroundColor: [
        '#007bff',
        '#28a745',
        '#ffc107',
        '#17a2b8',
        '#dc3545'
      ],
      borderRadius: 5,
      barThickness: 40
    }
]
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

  constructor(private http: HttpClient,private router: Router,private location:Location) {}

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      if (!localStorage.getItem('adminEmail')) {
        this.router.navigate(['/admin-login'], { replaceUrl: true });
      }
     const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }}
    this.semesters = [1, 2, 3, 4];
    this.departments = ['CSE', 'ECE', 'MECH','CIVIL','EEE'];
    this.selectedSemester = this.semesters[0];
    this.selectedDepartment = this.departments[0];

    this.fetchAnalyticsData();
  }

  fetchAnalyticsData(): void {
   // const storedReg = localStorage.getItem('registerNumber');
   // const storedDob = localStorage.getItem('dob');

    if (!this.selectedSemester || !this.selectedDepartment) {
      console.error('Register number or DOB not found in localStorage');
      return;
    }

   //const url = `http://localhost:8080/student/all-semesters?registerNumber=${storedReg}&dob=${storedDob}&semester=${this.selectedSemester}&department=${this.selectedDepartment}`;
 const url = `http://localhost:8080/api/analytics/api/analytics/top-students?semester=${this.selectedSemester}&department=${this.selectedDepartment}`;


 this.http.get<DepartmentData[]>(url).subscribe({
  next: (data) => {
    this.currentData = data[0];

    console.log('Top Students:', this.currentData.topStudents);
    if (this.currentData && this.currentData.subjects.length > 0) {
      const subjects = this.currentData.subjects;
      const labels = subjects.map(sub => sub.subject);


      const passPercentages = subjects.map(sub => {
        const total = sub.passCount + sub.failCount;
        return total > 0 ? Math.round((sub.passCount / total) * 100) : 0;
      });
      const failPercentages = subjects.map(sub => {
        const total = sub.passCount + sub.failCount;
        return total > 0 ? Math.round((sub.failCount / total) * 100) : 0;
      });

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Pass Percentage',
            data: passPercentages,
            backgroundColor: [
              '#007bff',
              '#28a745',
              '#ffc107',
              '#17a2b8',
              '#dc3545'
            ],
            borderRadius: 5,
            barThickness: 40
          },
          {
            label: 'Fail %',
            data: failPercentages,
            backgroundColor: '#dc3545',
            barThickness: 30
          }

        ]
      };

      this.donutChartData = this.getDonutData();
    }
    this.topStudents = this.currentData.topStudents.slice(0,3);
  },
  error: (err) => console.error('Error fetching analytics:', err)
});
  }
  getAvatarUrl(registerNumber: string): string {
    // Generate a unique number for each student based on their register number
    const avatarId = Math.floor(parseInt(registerNumber, 10) % 70) + 1; // Random number based on register number
    return `https://i.pravatar.cc/100?img=${avatarId}`;
  }

  updateCurrentData(): void {
    this.fetchAnalyticsData();
  }


  getBarData(subject: SubjectData): ChartData {
  return {
    labels: ['Pass', 'Fail'],
    datasets: [
      {
        label: subject.subject,
        data: [subject.passCount, subject.failCount],
        backgroundColor: ['#28a745', '#dc3545'],
      },
    ],
  };
}

getDonutData(): ChartData {
  if (!this.currentData) return { labels: [], datasets: [] };

  let totalPass = 0, totalFail = 0;
  this.currentData.subjects.forEach((sub: SubjectData) => {
    totalPass += sub.passCount;
    totalFail += sub.failCount;
  });

  return {
    labels: ['Pass', 'Fail'],
    datasets: [
      {
        data: [totalPass, totalFail],
        backgroundColor: ['#198754', '#dc3545'],
      },
    ],
  };
}



  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }

}

