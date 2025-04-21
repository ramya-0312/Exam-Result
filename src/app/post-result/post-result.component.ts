import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-post-result',
  templateUrl: './post-result.component.html',
  styleUrls: ['./post-result.component.css']
})
export class PostResultComponent {
  registerNumber: number | null = null;
  semester: number | null = null;
  collegeName: string = '';

  tamil!: number;
  english!: number;
  maths!: number;
  science!: number;
  social!: number;
  marks:number=0

  totalMarks: number = 0;
  result: string = '';

  semesters = [1, 2, 3, 4];

  constructor(
      private toastr: ToastrService,
      private router: Router
    ) {}


  calculateResult(): void {
    this.totalMarks = this.tamil + this.english + this.maths + this.science + this.social;

    const percentage = (this.totalMarks / 500) * 100;
    this.result = percentage >= 50 ? 'Pass' : 'Fail';
  }

  onSubmit(): void {
    this.calculateResult();

    // Backend call logic here if needed
    console.log('Result posted:', {
      registerNumber: this.registerNumber,
      semester: this.semester,
      collegeName: this.collegeName,
      marks: {
        tamil: this.tamil,
        english: this.english,
        maths: this.maths,
        science: this.science,
        social: this.social
      },
      total: this.totalMarks,
      result: this.result
    });
  }
logout() {
  this.router.navigate(['/admin-login']);
  }
postResult(){
  this.router.navigate(['/admin-dashboard'])
}
}
