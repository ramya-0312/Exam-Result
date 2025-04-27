import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-result-view',
  templateUrl: './view-result.component.html',
})
export class ViewResultComponent implements OnInit {
  student: any;
  activeTab: string = 'profile'; // Default profile view
  isLoading: boolean = false;  // Spinner state

  constructor(private router: Router) {}

  ngOnInit() {
    const data = localStorage.getItem('studentResult');
    if (data) {
      this.student = JSON.parse(data);
    }
  }

  loadResults() {
    this.isLoading = true; // Start loading state

    // Simulate the loading process for 3 seconds (using setTimeout)
    setTimeout(() => {
      this.isLoading = false;  // Stop the loading state
      this.activeTab = 'result';  // Switch to results tab
    }, 3000); // 3 seconds delay
  }

  getPercentage(): number {
    if (!this.student?.marks) return 0;
    const totalSubjects = this.student.marks.length;
    const totalMarks = Number(this.student.total);
    return parseFloat(((totalMarks / (totalSubjects * 100)) * 100).toFixed(2));
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  printPage() {
    window.print();
  }
}
