import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-revaluation-status',
  templateUrl: './revaluation-status.component.html',
  styleUrls: ['./revaluation-status.component.css']
})
export class RevaluationStatusComponent implements OnInit {
  revaluationList: any[] = [];
  isLoading = false;

  constructor(private http: HttpClient,private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchRevaluationStatus();
  }

  fetchRevaluationStatus(): void {
    const regNo = localStorage.getItem('registerNumber');
    if (!regNo) return;

    this.isLoading = true;

    this.http.get<any>(`http://localhost:8080/studentrevalution/gettall?registered=${regNo}`)
      .subscribe(
        (res) => {
          this.revaluationList = Array.isArray(res.response) ? res.response : [];
          this.isLoading = false;
        },
        (err) => {
          console.error('Error fetching revaluation status:', err);
          this.revaluationList = [];
          this.isLoading = false;
        }
      );
  }
 viewResult(record: any): void {
  const regNo = record.registered;
  const semester = record.semester;

  // Call result API
  this.http.get<any>(`http://localhost:8080/studentrevalution/gettall?registered=${regNo}&semester=${semester}`)
    .subscribe(
      (res) => {
        if (res && res.response) {
          localStorage.setItem('resultData', JSON.stringify(res));
          localStorage.setItem('selectedSemester', semester);
          localStorage.setItem('registerNumber', regNo);
          localStorage.setItem('dob', record.dob || '');

          this.router.navigate(['/view-result']);
        } else {
          this.toastr.error('Invalid result data. Please try again.');
        }
      },
      (err) => {
        console.error('Error fetching result:', err);
        this.toastr.error('Error fetching result.');
      }
    );
}
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
