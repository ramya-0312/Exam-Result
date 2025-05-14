import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ResultService } from '../services/result.service';

type SubjectName = 'tamil' | 'english' | 'maths' | 'science' | 'social';

@Component({
  standalone:false,
  selector: 'app-post-result',
  templateUrl: './post-result.component.html',
  styleUrls: ['./post-result.component.css']
})
export class PostResultComponent implements OnInit {
  adminEmail: string = '';
  registered: number|null=null;
  semester: number | null = null;
  revaluationSubjects: SubjectName[] = [];

  marks: Record<SubjectName, number | null> = {
    tamil: null,
    english: null,
    maths: null,
    science: null,
    social: null
  };

  grade: string = '';
  totalMarks: number = 0;
  result: string = '';
  calculated: boolean = false;
  semesters = [1, 2, 3, 4];

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }

     const regNo = localStorage.getItem('approvedRegNo');
  const sem = localStorage.getItem('approvedSemester');
  if (regNo && sem) {
    this.registered = Number(regNo);
    this.semester = Number(sem);

    // Clear after use (optional)
    localStorage.removeItem('approvedRegNo');
    localStorage.removeItem('approvedSemester');
  }


    // Get query params
    this.route.queryParams.subscribe(params => {
      this.registered = +params['registered'];
      this.semester = +params['semester'];
      this.revaluationSubjects = params['subjects']
        ? params['subjects'].split(',') as SubjectName[]
        : [];

      if (this.registered && this.semester) {
        this.fetchPreviousResult();
      }
    });
  }

  fetchPreviousResult() {
    this.http.get<any>(`http://localhost:8080/student/result`, {
      params: {
        registerNumber: this.registered?.toString() || '',
        semester: this.semester?.toString() || ''
      }
    }).subscribe({
      next: (res) => {
        // Prefill non-revaluation subjects
        const subjectKeys: SubjectName[] = ['tamil', 'english', 'maths', 'science', 'social'];
        for (let subject of subjectKeys) {
          if (!this.revaluationSubjects.includes(subject)) {
            this.marks[subject] = res[subject];  // use old mark
          }
        }
      },
      error: (err) => {
        this.toastr.error('Failed to fetch previous result');
      }
    });
  }

  blockInvalidMarks(event: KeyboardEvent, subject: SubjectName) {
    const inputChar = String.fromCharCode(event.keyCode);
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (!allowedKeys.includes(inputChar)) {
      event.preventDefault();
    }

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
    let hasFailedSubject = false;

    for (const subject in this.marks) {
      const mark = this.marks[subject as SubjectName];
      const numericMark = Number(mark);

      if (!isNaN(numericMark)) {
        sum += numericMark;
        count++;

        if (numericMark < 35) {
          hasFailedSubject = true;
        }
      }
    }

    this.totalMarks = sum;
    this.grade = sum.toString();

    if (count === Object.keys(this.marks).length) {
      const percentage = (sum / 500) * 100;
      this.result = hasFailedSubject ? 'Fail' : (percentage >= 35 ? 'Pass' : 'Fail');
      this.calculated = true;
    } else {
      this.result = '';
      this.calculated = false;
    }
  }

  onSubmit(form: NgForm): void {
    if (!this.calculated) {
      this.toastr.warning('Please click "Calculate" before submitting.');
      return;
    }

    if (Object.values(this.marks).includes(null)) {
      this.toastr.error('Please enter all marks.');
      return;
    }

    const payload = {
      registered: this.registered,
      semester: this.semester,
      tamil: this.marks.tamil,
      english: this.marks.english,
      maths: this.marks.maths,
      science: this.marks.science,
      social: this.marks.social,
      grade: this.totalMarks,
      result: this.result
    };

    this.http.post<any>('http://localhost:8080/student/postresult', payload).subscribe({
      next: (res) => {
        this.toastr.success(res.response);
        form.resetForm();
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Failed to post result');
      }
    });
  }

  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }

  postResult() {
    this.router.navigate(['/post.service']);
  }
}
