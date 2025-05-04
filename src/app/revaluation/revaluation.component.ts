import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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
    alert('Revaluation request submitted for: ' + this.selectedSubjects.join(', '));
    this.router.navigate(['/view-result']);
  }
}
