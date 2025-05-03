import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';

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

  // ngOnInit(): void {
  //   const state = history.state;

  //   if (!state.registered || !state.dob) {
  //     this.router.navigate(['/student-result']);
  //     return;
  //   }
  // }
  ngOnInit(): void {

    const storedStudent = localStorage.getItem('studentResult');

    if (storedStudent) {
      this.student = JSON.parse(storedStudent);
      this.loading = false;
    } else {
      this.router.navigate(['/student-result']);
    }
  }


  // goToSemesterSelection() {

  //   this.router.navigate(['/select-semester'], {
  //     state: {
  //       registerNumber: this.student.registerNumber,
  //       dob: this.student.dob
  //     }
  //   });
  // }
  goToSemesterSelection() {
    this.router.navigate(['/select-semester'], {
      state: {
        registerNumber: this.student.registered, // fixed property name
        dob: this.student.dob
      }
    });
  }

  confirmLogout() {
   localStorage.clear();
    this.router.navigate(['/home']);
  }

}
