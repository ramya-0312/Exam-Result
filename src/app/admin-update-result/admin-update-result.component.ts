import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import{ ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


type SubjectName = 'tamil' | 'english' | 'maths' | 'science' | 'social';

@Component({
  standalone:false,
  selector: 'app-admin-update-result',
  templateUrl: './admin-update-result.component.html'
})
export class AdminUpdateResultComponent implements OnInit {
  adminEmail:string=''
  studentData: any = null;
  one: any = null;
  registered = '';
  semester = '';
   grade: string = '';
  totalMarks: number = 0;
  result: string = '';
  calculated: boolean = false;
  semesters = [1, 2, 3, 4];
   marks: Record<SubjectName, string | null> = {
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: ''
  };

  //s.updatedMark: number = 0;



  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService,private location:Location) {}
  ngOnInit(): void {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      if (!localStorage.getItem('adminEmail')) {
        this.router.navigate(['/admin-login'], { replaceUrl: true });
      }
    };
    this.registered = localStorage.getItem('approvedRegNo') || '';
    this.semester = localStorage.getItem('approvedSemester') || '';
     const storedEmail = localStorage.getItem('adminEmail');
    //  const storedEmail = localStorage.getItem('adminEmail');

  if (!storedEmail) {
    alert('Unauthorized access. Please log in as admin.');
    this.router.navigate(['/admin-login']);
    return;
  }

  this.adminEmail = storedEmail;

  if (this.registered && this.semester) {
    this.loadApprovedRevaluationData();
  } else {
    alert("Registered number and semester are missing.");
  }

    // Automatically load data if both are available
    if (this.registered && this.semester) {
      this.loadApprovedRevaluationData();
    } else {
      alert("Registered number and semester are missing.");
    }
  }

  loadApprovedRevaluationData() {
    const url = `http://localhost:8080/api/revaluation/approvegetpost?registered=${this.registered}&semester=${this.semester}`;
    this.http.get<any>(url).subscribe(response => {
      if (response.status === 'OK') {
        response.response.subjects.forEach((subject: any) => {
          subject.updatedMark = subject.mark;
        });
        this.studentData = response.response;
      }
    });
  }

  validateUpdatedMark(s: any) {
  if (s.updatedMark > 100) {
    s.updatedMark = 100;
  } else if (s.updatedMark < 0) {
    s.updatedMark = 0;
  }
}

// Block typing anything that would go beyond 100
preventInvalidInput(event: KeyboardEvent, s: any) {
  const inputChar = event.key;
  const currentValue = String(s.updatedMark ?? '');

  // Allow control keys like Backspace, Arrow keys
  if (event.ctrlKey || event.metaKey || event.altKey || ['Backspace', 'ArrowLeft', 'ArrowRight'].includes(inputChar)) {
    return;
  }

  const nextValue = currentValue + inputChar;

  // Block if length exceeds 3
  if (nextValue.length > 3) {
    event.preventDefault();
    return;
  }

  // Block if number becomes more than 100
  const numericValue = Number(nextValue);
  if (isNaN(numericValue) || numericValue > 100) {
    event.preventDefault();
  }
}

// Ensure even pasted or programmatic value doesn’t exceed limits
restrictMarkInput(event: any, s: any) {
  let value = Number(event.target.value);

  if (isNaN(value)) {
    s.updatedMark = '';
    return;
  }

  if (value > 100) {
    s.updatedMark = 100;
  } else if (value < 0) {
    s.updatedMark = 0;
  } else {
    s.updatedMark = value;
  }
}

//   submitUpdatedResult() {
//   if (!this.studentData || !this.studentData.subjects) return;

//   const marksMap: Record<SubjectName, number> = {
//     tamil: 0,
//     english: 0,
//     maths: 0,
//     science: 0,
//     social: 0
//   };

//   this.studentData.subjects.forEach((s: any) => {
//     const name = s.mar.toLowerCase();
//     if (name in marksMap) {
//       marksMap[name as SubjectName] = s.updatedMark;
//     }
//   });

//   const sum = Object.values(marksMap).reduce((a, b) => a + Number(b), 0);
//   const percentage = (sum / 500) * 100;
//   const hasFail = Object.values(marksMap).some(m => Number(m) < 35);
//   const result = hasFail ? 'Fail' : (percentage >= 35 ? 'Pass' : 'Fail');

//   const payload = {
//     registered: this.registered,
//     semester: this.semester,
//     ...marksMap,
//     grade: sum,
//     result: result
//   };

//   this.http.post('http://localhost:8080/student/update', payload)
//     .subscribe(() => {
//       alert('Updated result posted successfully!');
//     });
// }
submitUpdatedResult() {
  if (!this.studentData || !this.studentData.subjects) return;

  const marksMap: Record<SubjectName, number> = {
    tamil: 0,
    english: 0,
    maths: 0,
    science: 0,
    social: 0
  };

  this.studentData.subjects.forEach((s: any) => {
    const name = (s.name || '').toLowerCase(); // ✅ Fixed this line
    if (name === 'tamil') marksMap.tamil = Number(s.updatedMark) || 0;
    else if (name === 'english') marksMap.english = Number(s.updatedMark) || 0;
    else if (name === 'mathematics') marksMap.maths = Number(s.updatedMark) || 0;
    else if (name === 'science') marksMap.science = Number(s.updatedMark) || 0;
    else if (name === 'social science') marksMap.social = Number(s.updatedMark) || 0;
  });

  const sum = Object.values(marksMap).reduce((a, b) => a + b, 0);
  const percentage = (sum / 500) * 100;
  const hasFail = Object.values(marksMap).some(m => m < 35);
  const result = hasFail ? 'Fail' : (percentage >= 35 ? 'Pass' : 'Fail');

  const payload = {
    registered: this.registered,
    semester: this.semester,
    ...marksMap,
    grade: sum.toString(),
    result: result
  };

  console.log('Payload:', payload);

  this.http.post('http://localhost:8080/student/update', payload)
    .subscribe(() => {
      this.router.navigate(['admin-revalution']);
      alert('Updated result posted successfully!');

    });
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

  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
