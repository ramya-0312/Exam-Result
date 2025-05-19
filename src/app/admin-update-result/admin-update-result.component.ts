import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-admin-update-result',
  templateUrl: './admin-update-result.component.html'
})
export class AdminUpdateResultComponent implements OnInit {
  adminEmail:string=''
  studentData: any = null;
  registered = '';
  semester = '';

  //s.updatedMark: number = 0;



  constructor(private http: HttpClient,private router: Router,) {}

  ngOnInit(): void {
    // Prefill from localStorage

    this.registered = localStorage.getItem('approvedRegNo') || '';
    this.semester = localStorage.getItem('approvedSemester') || '';
     const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) this.adminEmail = storedEmail;

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

  submitUpdatedResult() {
    const payload = {
      registerNumber: this.studentData.registered,
      semester: this.studentData.semester,
      updatedSubjects: this.studentData.subjects.map((subject: any) => ({
        name: subject.name,
        newMark: subject.updatedMark,
        revaluationApplied: subject.revaluationApplied
      }))
    };

    this.http.post('http://localhost:8080/student/update', payload)
      .subscribe(() => {
        alert('Updated result posted successfully!');
      });
  }
  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
