import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ResultService } from '../services/result.service';
import { ApiService } from '../services/api.service';


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
  revaluationApplied: SubjectName[] = [];
  resultData:any=null;
  marksForm:any=null;

  marks: Record<SubjectName, string | null> = {
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  };

  revalStatus = {
  tamil: false,
  english: false,
  maths: false,
  science: false,
  social: false
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
    private resultService: ResultService,
    private apiService: ApiService
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

    localStorage.removeItem('approvedRegNo');
    localStorage.removeItem('approvedSemester');
  }

  this.route.queryParams.subscribe(params => {
    const paramReg = params['registered'];
    const paramSem = params['semester'];

    if (paramReg && paramSem) {
      this.registered = +paramReg;
      this.semester = +paramSem;
    }

    this.revaluationApplied = params['subjects']
      ? params['subjects'].split(',') as SubjectName[]
      : [];

    if (this.registered && this.semester) {
      this.fetchPreviousResult();  // Only one fetch call here
    }
  });
}

 fetchPreviousResult() {
  this.http.get<any>(`http://localhost:8080/studentrevalution/gettall`, {
    params: {
      registered: this.registered?.toString() || '',
      semester: this.semester?.toString() || ''
    }
  }).subscribe({
    next: (res) => {
      console.log('Full response:', res);
      console.log('res.response:', res.response);

      const subjects = res.response[0]?.subject;
      console.log('Fetched subjects:', subjects);

      if (subjects && Array.isArray(subjects)) {
        subjects.forEach((subject: any) => {
          console.log('Subject:', subject.name, 'Mark:', subject.mark, 'Reval:', subject.revaluationApplied);

          const name = subject.name?.toLowerCase().trim();
          const mark = subject.mark;
          const isReval = subject.revaluationApplied;

          switch (name) {
            case 'tamil':
              this.marks.tamil = mark;
              this.revalStatus.tamil = isReval;
              break;
            case 'english':
              this.marks.english = mark;
              this.revalStatus.english = isReval;
              break;
            case 'mathematics':
            case 'maths':
              this.marks.maths = mark;
              this.revalStatus.maths = isReval;
              break;
            case 'science':
              this.marks.science = mark;
              this.revalStatus.science = isReval;
              break;
            case 'social science':
              this.marks.social = mark;
              this.revalStatus.social = isReval;
              break;
            default:
              console.warn('Unknown subject:', name);
          }
        });
      }
    },
    error: () => {
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

  if (value === null) return;

  const numericValue = Number(value);
  if (isNaN(numericValue)) return;

  if (numericValue > 100) this.marks[subject] = '100';
  else if (numericValue < 0) this.marks[subject] = '0';

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
