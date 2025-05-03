import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  // registered = '';
  // dob = '';
  semester = '';
  // selectedSemester = '';
  // errorMessage = '';
  // totalMarks = '';
  // resultStatus = '';
  student: {
    name: string;
    registered: string;
    department: string;
    marks: { name: string; marks: number }[];
    total: string;
    result: string;
  } | null = null;
  loadingResult = false;
  error = '';
  resultData = '';

  constructor(private router: Router) {}

  // ngOnInit(): void {
  //   this.resultData = JSON.parse(localStorage.getItem('resultData') || '{}');
  //   const resultRaw = localStorage.getItem('resultData');
  //   const semester = localStorage.getItem('selectedSemester');
  //   const registered = localStorage.getItem('registerNumber');
  //   const dob = localStorage.getItem('dob');

  //   if (!resultRaw || !semester || !registered || !dob) {
  //     alert('Incomplete data. Please start again.');
  //     this.router.navigate(['/student-result']);
  //     return;
  //   }

  //   const resultParsed = JSON.parse(resultRaw);

  //   this.semester = semester;
  //   const data = resultParsed.response[0];

  //   this.resultData = {
  //     name: resultParsed.studentName,
  //     registerNumber: registered,
  //     department: 'N/A', // You can update if you get this from backend
  //     marks: [
  //       { subject: 'English', mark: data.english },
  //       { subject: 'Mathematics', mark: data.maths },
  //       { subject: 'Science', mark: data.science },
  //       { subject: 'Social', mark: data.social }
  //     ],
  //     total: data.grade,
  //     result: data.result
  //   };
  // }
  ngOnInit(): void {
    const resultRaw = localStorage.getItem('resultData');
    const semester = localStorage.getItem('selectedSemester');
    const registered = localStorage.getItem('registerNumber');
    const dob = localStorage.getItem('dob');
  
    if (!resultRaw || !semester || !registered || !dob) {
      alert('Incomplete data. Please start again.');
      this.router.navigate(['/student-result']);
      return;
    }
  
    const resultParsed = JSON.parse(resultRaw);
    const data = resultParsed.response;
  
    // Set the values properly
    this.semester = semester;
    this.student = {
      name: data.name,
      registered: data.registered,
      department: data.department,
      marks: data.subjects,
      total: data.totalMarks,
      result: data.resultStatus
    };
  }
  

  // 
  getPercentage(): number {
    const total = Number(this.student?.total);
    return Math.round((total / 500) * 100);
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  printPage() {
    window.print();
  }
  confirmLogout() {
    localStorage.clear();
     this.router.navigate(['/home']);
   }
}
