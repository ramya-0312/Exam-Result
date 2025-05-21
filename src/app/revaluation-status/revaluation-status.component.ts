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
    const dob = localStorage.getItem('dob');
    const sem = localStorage.getItem('viewSemester');
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
    console.log(record)
 const regNo = localStorage.getItem('registerNumber');
    const dob = localStorage.getItem('dob');
  localStorage.setItem('viewSemester', record.semester);
  this.router.navigate(['/select-semester']);
}
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
