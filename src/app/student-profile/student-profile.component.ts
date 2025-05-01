import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  student: any;
  loading = true;
  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const state = history.state;

    if (!state.registered || !state.dob) {
      this.router.navigate(['/student-result']);
      return;
    }

    const params = new HttpParams()
  .set('registerNumber', state.registered)
  .set('dob', state.dob);

this.http.get('http://your-backend-url/student/profile', { params }).subscribe({
  next: (res: any) => {
    this.student = res;
    this.loading = false;
  },
  error: (err) => {
    this.error = 'Student not found or invalid details';
    this.loading =false;
  }
});
  }

  goToSemesterSelection() {
    this.router.navigate(['/select-semester'], {
      state: {
        registered: this.student.registered,
        dob: this.student.dob
      }
    });
  }
}
