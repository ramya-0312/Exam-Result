//import { SelectSemesterComponent } from './../select-semester/select-semester.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { ToastrService } from 'ngx-toastr';
//import { ThemeService } from '../services/theme.service';

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
    if (!this.registered || !this.dob) {
      this.toastr.error('Please enter Register Number and DOB.', 'Error');
      return;
    }

    const formattedDob = this.getFormattedDOB();

    // Backend validation check
    this.resultService.getResult(this.registered, formattedDob).subscribe({
      next: (data: any) => {
        if (data && data.student) {
          // Navigate only if valid
          this.router.navigate(['/student-profile'], {
            state: {
              registerNumber: this.registered,
              dob: formattedDob
            }
          });
        } else {
          this.toastr.error('Student not found.', 'Error');
        }
      },
      error: () => {
        this.toastr.error('Invalid details or server error.', 'Error');
      }
    });
  }

  getResult() {
    if (!this.registered || !this.dob) {
      this.toastr.error('Please fill all fields.', 'Error');
      return;
    }

    const formattedDob = this.getFormattedDOB();

    this.resultService.getResult(this.registered, formattedDob).subscribe({
      next: (data: any) => {
        if (data && data.student) {
          // Store necessary data
          localStorage.setItem('studentResult', JSON.stringify(data));
          localStorage.setItem('semester', this.selectedSemester);
          localStorage.setItem('studentAuth', 'true');

          // Navigate with state
          this.router.navigate(['/student-profile'], {
            state: {
              registerNumber: this.registered,
              dob: formattedDob
            }
          });
        } else {
          this.toastr.error('Student not found.', 'Error');
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Invalid details', 'Error');
      }
    });
  }
// getResult(){}
}
