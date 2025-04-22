import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
})
export class StudentResultComponent {
  registerNumber = '';
  dob = '';
  errorMessage = '';
  totalMarks = '';
  resultStatus = '';
  subjects: { name: string; marks: number }[] = [];
  resultFetched: boolean = false;

  constructor(
    private router: Router,
    private resultService: ResultService,
    private toastr: ToastrService
  ) {}

  private getFormattedDOB(): string {
    const date = new Date(this.dob);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  submit() {
    if (!this.registerNumber || !this.dob) {
      this.toastr.error('Please fill both fields.', 'Error');
      return;
    }

    const formattedDob = this.getFormattedDOB();

    this.resultService.getResult(this.registerNumber, formattedDob).subscribe({
      next: (data: any) => {
        if (data && data.message) {
          this.toastr.success(data.message, 'Success');
        }

        localStorage.setItem('studentResult', JSON.stringify(data));
        this.router.navigate(['/view-result']);
      },
      error: (err) => {
        //const backendMessage = err?.error?.message || 'Invalid Register Number or DOB.';
        this.toastr.error(err.error.message);
      }
    });
  }
getResult(){}
}
