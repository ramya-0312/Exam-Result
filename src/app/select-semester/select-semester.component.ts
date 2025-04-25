import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-select-semester',
  templateUrl: './select-semester.component.html',
  styleUrls: ['./select-semester.component.css']
})
export class SelectSemesterComponent implements OnInit {
  selectedSemester: string = '';
  semesters = [
    { name: 'Semester 1', value: 'sem1' },
    { name: 'Semester 2', value: 'sem2' },
    { name: 'Semester 3', value: 'sem3' },
    { name: 'Semester 4', value: 'sem4' }
  ];

  constructor(private router: Router) {}

  viewResult(semester: string) {
    this.router.navigate(['/view-result']);
  }

  ngOnInit(): void {
    const storedSemester = localStorage.getItem('semester');
    if (storedSemester) {
      this.selectedSemester = storedSemester;
    }
  }
}
