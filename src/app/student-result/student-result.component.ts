//import { SelectSemesterComponent } from './../select-semester/select-semester.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../services/theme.service';

@Component({
  standalone: false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
})
export class StudentResultComponent {
  registered = '';
  dob = '';
  selectedSemester = ''; // New field for semester
  errorMessage = '';
  totalMarks = '';
  resultStatus = '';
  subjects: { name: string; marks: number }[] = [];
  resultFetched: boolean = false;


  constructor(
    private router: Router,
    private resultService: ResultService,
    private toastr: ToastrService,
    //private themeService:ThemeService

  ) {}

  private getFormattedDOB(): string {
    const date = new Date(this.dob);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  viewSemesters() {
    const studentData = {
      registerNumber: this.registered,
      dob: this.dob
    };

    this.router.navigate(['/student-profile'], { state: studentData });
  }

  getResult() {
    if (!this.registered || !this.dob ) {
      this.toastr.error('Please fill all fields including semester.', 'Error');
      return;

    }

    const formattedDob = this.getFormattedDOB();

    this.resultService.getResult(this.registered, formattedDob).subscribe({
      next: (data: any) => {
        if (data && data.message) {
          this.toastr.success(data.message, 'Success');
        }

        localStorage.setItem('studentResult', JSON.stringify(data));
        localStorage.setItem('semester', this.selectedSemester); // Store semester if needed
        localStorage.setItem('studentAuth', 'true'); // After successful result fetch
        this.router.navigate(['/student-profile']);

      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Invalid details');
      }
    });
  }
// getResult(){}
}
