import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RevaluationService } from '../services/revaluation.service';

@Component({
  standalone:false,
  selector: 'app-admin-revaluation',
  templateUrl: './admin-revaluation.component.html',
  styleUrls: ['./admin-revaluation.component.css']
})
export class AdminRevaluationComponent implements OnInit {
  revaluationRequests: any[] = [];
  loading = true;
  adminEmail: string = '';
constructor(
  private revaluationService: RevaluationService,
  private toastr: ToastrService,
  private router: Router,
  private http:HttpClient
) {}

  ngOnInit(): void {
    this.fetchRevaluationRequests();
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) this.adminEmail = storedEmail;
  }

  fetchRevaluationRequests(): void {
  this.http.get<any>('http://localhost:8080/api/revaluation/revaluations').subscribe({
    next: (data) => {
      console.log('API Response:',data)
      this.revaluationRequests = data.response;
      console.log(this.revaluationRequests)
      this.loading = false;
    },
    
    error: () => {
      this.toastr.error('Failed to load revaluation requests.');
      this.loading = false;
    }
  });
}


approveRequest(id: number, registered: number, semester: number, status: string): void {
  this.http.get(`http://localhost:8080/api/revaluation/approvegetpost?registered=${registered}&semester=${semester}`, {}, ).subscribe({
    next: (response: any) => {
      //this.toastr.success(response.message.note); // This will now show "Status updated to Approved"
     // this.toastr.success(JSON.stringify(response.message));
      if (status === 'Approved') {
      localStorage.setItem('approvedRegNo', registered.toString());
      localStorage.setItem('approvedSemester', semester.toString());
      this.router.navigate(['/admin-update-result']);
      }

      this.fetchRevaluationRequests();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Failed to approve request');
    }
  });
}

rejectRequest(id: number, registered: number, semester: number, status: string): void {
  this.http.post(`http://localhost:8080/api/revaluation/reject?registered=${registered}&semester=${semester}`, {}, ).subscribe({
    next: (res: any) => {
      this.toastr.success(res.response); // e.g. "Status updated to Rejected"
      this.fetchRevaluationRequests();
    },
    error: (err) => {
      console.error(err);
      this.toastr.error('Failed to reject request');
    }
  });
}

  confirmLogout(): void {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
