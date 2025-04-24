import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-result-view',
  templateUrl: './view-result.component.html',
})
export class ViewResultComponent implements OnInit {
  student: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('studentResult');
    if (data) {
      this.student = JSON.parse(data);
    }
  }
  getPercentage(): number {
    if (!this.student?.marks) return 0;
    const totalSubjects = this.student.marks.length;
    const totalMarks = Number(this.student.total); // Convert to number
    return parseFloat(((totalMarks / (totalSubjects * 100)) * 100).toFixed(2));
  }

  goHome() {
    this.router.navigate(['/home']); // Replace with your home route
  }
  viewResult() {
    // Check for valid register number & DOB, then:
    localStorage.setItem('studentAuth', 'true'); // SET here

    this.router.navigate(['/select-semester']);
  }

  printPage() {
    window.print();
  }
}
