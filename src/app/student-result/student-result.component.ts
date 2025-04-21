import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';

@Component({
  standalone:false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
})
export class StudentResultComponent {
  registerNumber = '';
  dob = '';
  errorMessage = '';
  regNo ='';
  totalMarks ='';
  resultStatus ='';
  subjects:{name:string,marks:number}[]=[];
  resultFetched:boolean=false;


  getResult(){

  }

  constructor(private router: Router, private resultService: ResultService) {}

  submit() {
    if (!this.registerNumber || !this.dob) {
      this.errorMessage = 'Please fill both fields.';
      return;
    }

    this.resultService.getResult(this.registerNumber, this.dob).subscribe({
      next: (data) => {
        localStorage.setItem('studentResult', JSON.stringify(data));
        this.router.navigate(['/view-result']);
      },
      error: () => {
        this.errorMessage = 'Invalid Register Number or DOB.';
      }
    });
  }
}
