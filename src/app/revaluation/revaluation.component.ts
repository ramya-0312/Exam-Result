import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-revaluation',
  templateUrl: './revaluation.component.html',
  styleUrls: ['./revaluation.component.css']
})
export class RevaluationComponent implements OnInit {
  studentName = '';
  registerNumber = '';
  department = '';
  semester = '';
  selectedSubjects: string[] = [];

  subjects = ['Tamil', 'English', 'Mathematics', 'Science', 'Social Science'];

  constructor(private http: HttpClient, private router: Router,private toastr: ToastrService,) {}

  ngOnInit(): void {
    // Get student details from local storage
    this.studentName = localStorage.getItem('studentName') || '';
    this.registerNumber = localStorage.getItem('registerNumber') || '';
    this.department = localStorage.getItem('department') || '';
    this.semester = localStorage.getItem('selectedSemester') || '';
  }

  toggleSubject(subject: string) {
    const index = this.selectedSubjects.indexOf(subject);
    if (index > -1) {
      this.selectedSubjects.splice(index, 1);
    } else {
      this.selectedSubjects.push(subject);
    }
  }

  applyRevaluation() {
    if (this.selectedSubjects.length === 0) {
      alert('Please select at least one subject to apply for revaluation.');
      return;
    }

    const payload = {
      registered: parseInt(this.registerNumber),
      semester: parseInt(this.semester),
       date: new Date().toISOString(),
      subject: this.selectedSubjects,
      status:"pending"
    };
//     const backendPayload = {
//   id: 0,
//   registered: String(rawPayload.registered),
//   semester: String(rawPayload.semester),
//   date: new Date().toISOString(),
//   subject: rawPayload.subject
// };

    console.log('Payload:', payload);

    this.http.post('http://localhost:8080/api/revaluation/apply', payload).subscribe({
      next: (res: any) => {
        console.log('Response:',res);
        this.toastr.success(res.message || 'Revaluation request submitted');

        this.router.navigate(['/view-result']);
      },
      error: (err) => {
        console.error('API Error:', err);
        this.toastr.error('Failed to submit revaluation.');
  }

    });
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}

