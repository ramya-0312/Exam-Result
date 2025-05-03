import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  student: any;
  semester: string = '';
  loadingResult = false;
  resultData:any

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.resultData = JSON.parse(localStorage.getItem('resultData') || '{}');
    const resultRaw = localStorage.getItem('resultData');
    const semester = localStorage.getItem('selectedSemester');
    const registerNumber = localStorage.getItem('registerNumber');
    const dob = localStorage.getItem('dob');

    if (!resultRaw || !semester || !registerNumber || !dob) {
      alert('Incomplete data. Please start again.');
      this.router.navigate(['/student-result']);
      return;
    }

    const resultParsed = JSON.parse(resultRaw);

    this.semester = semester;
    const data = resultParsed.response[0];

    this.student = {
      name: resultParsed.studentName,
      registerNumber: registerNumber,
      department: 'N/A', // You can update if you get this from backend
      marks: [
        { subject: 'English', mark: data.english },
        { subject: 'Mathematics', mark: data.maths },
        { subject: 'Science', mark: data.science },
        { subject: 'Social', mark: data.social }
      ],
      total: data.grade,
      result: data.result
    };
  }

  getPercentage(): number {
    const totalMarks = Number(this.student.total);
    return Math.round((totalMarks / 500) * 100);
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
