import { Component } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-post-result',
  templateUrl: './post-result.component.html',
  styleUrls: ['./post-result.component.css']
})
export class PostResultComponent {
  registerNumber: number = 0;
  semester: number | null = null;
  collegeName: string = '';

  tamil: number = 0;
  english: number = 0;
  maths: number = 0;
  science: number = 0;
  social: number = 0;
  marks:number=0

  totalMarks: number = 0;
  result: string = '';

  semesters = [1, 2, 3, 4];

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
}
