import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

type SubjectName = 'tamil' | 'english' | 'maths' | 'science' | 'social';

@Component({
  standalone: false,
  selector: 'app-post-result',
  templateUrl: './post-result.component.html',
  styleUrls: ['./post-result.component.css']
})
export class PostResultComponent implements OnInit {
  adminEmail: string = '';
  registerNumber: number | null = null;
  semester: number | null = null;
  collegeName: string = '';

  marks: Record<SubjectName, number | null> = {
    tamil: null,
    english: null,
    maths: null,
    science: null,
    social: null
  };

  totalMarks: number = 0;
  result: string = '';
  calculated: boolean = false;
  semesters = [1, 2, 3, 4];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }
  }


  blockInvalidMarks(event: KeyboardEvent, subject: SubjectName) {
    const inputChar = String.fromCharCode(event.keyCode);
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (!allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }

    // Check if after adding the new digit, value crosses 100
    const currentVal = this.marks[subject]?.toString() || '';
    const newVal = currentVal + inputChar;
    const numericVal = parseInt(newVal, 10);

    if (!isNaN(numericVal) && numericVal > 100) {
      event.preventDefault();
    }
  }

  validateMarks(subject: SubjectName) {
    let value = this.marks[subject];
    if (value === null || isNaN(value)) return;

    if (value > 100) this.marks[subject] = 100;
    else if (value < 0) this.marks[subject] = 0;

    this.calculated = false;
  }

  calculateResult() {
    let sum = 0;
    let count = 0;

    for (const subject in this.marks) {
      const mark = this.marks[subject as SubjectName];
      if (mark !== null && !isNaN(mark)) {
        sum += Number(mark);
        count++;
      }
    }

    this.totalMarks = sum;

    if (count === Object.keys(this.marks).length) {
      const percentage = (sum / 500) * 100;
      this.result = percentage >= 50 ? 'Pass' : 'Fail';
      this.calculated = true;
    } else {
      this.result = '';
      this.calculated = false;
    }
  }

  onSubmit(): void {
    if (!this.calculated) {
      this.toastr.warning('Please click "Calculate" before submitting.');
      return;
    }

    if (Object.values(this.marks).includes(null)) {
      this.toastr.error('Please enter all marks.');
      return;
    }

    const payload = {
      registerNumber: this.registerNumber,
      semester: this.semester,
      tamil:this.marks.tamil,
      english:this.marks.english,
      maths:this.marks.maths,
      science:this.marks.science,
      social:this.marks.social,
      grade: this.totalMarks,
      result: this.result
    };

    this.http.post<any>('http://localhost:8080/api/post-result', payload).subscribe({
      next: (res) => {
        this.toastr.success(res.response);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }

  logout() {}

  confirmLogout() {
    this.router.navigate(['/admin-login']);
  }

  postResult() {
    this.router.navigate(['/admin-dashboard']);
  }
}
