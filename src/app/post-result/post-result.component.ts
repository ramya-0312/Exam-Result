import { Component } from '@angular/core';
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
export class PostResultComponent {
  adminEmail:string='';
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
  semesters = [1, 2, 3, 4];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private http:HttpClient
  ) {}

  blockInvalidMarks(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (!allowedKeys.includes(inputChar)) {
      event.preventDefault(); // block non-numeric
    }
  }

  validateMarks(subject: SubjectName) {
    let value = this.marks[subject];
    if (value === null || isNaN(value)) return;

    // Bound the marks between 0 and 100
    if (value > 100) this.marks[subject] = 100;
    else if (value < 0) this.marks[subject] = 0;

    // Immediately recalculate when any mark is changed
    this.calculateResult();
  }

  calculateResult() {
    let sum = 0;
    let count = 0;

    for (const subject in this.marks) {
      const mark = this.marks[subject as SubjectName];
      if (mark !== null && !isNaN(mark)) {
        sum += mark;
        count++;
      }
    }

    this.totalMarks = sum;

    // Only show Pass/Fail if all subjects have marks
    if (count === Object.keys(this.marks).length) {
      const percentage = (sum / 500) * 100;
      this.result = percentage >= 50 ? 'Pass' : 'Fail';
      const storedEmail=localStorage.getItem('adminEmail');
    if(storedEmail){
      this.adminEmail=storedEmail;
    }

    } else {
      this.result = '';
    }
  }

  onSubmit(): void {
    this.calculateResult();

    if (Object.values(this.marks).includes(null)) {
      this.toastr.error('Please enter all marks.');
      return;
    }

    // Optional: Post result to backend here
    const payload= {
      registerNumber: this.registerNumber,
      semester: this.semester,
      collegeName: this.collegeName,
      marks: this.marks,
      total: this.totalMarks,
      result: this.result
    };

    this.http.post<any>('http://localhost:8080/api/post-result', payload).subscribe({
      next: (res) => {
        this.toastr.success(res.response);
        //console.log('Response:', response);
      },
      error: (err) => {
        this.toastr.error(err.error.message);
        //console.error('Error:', error);
      }
    });
  }

  logout() {

  }
  confirmLogout(){
    this.router.navigate(['/admin-login']);
  }

  postResult() {
    this.router.navigate(['/admin-dashboard']);
  }
}
