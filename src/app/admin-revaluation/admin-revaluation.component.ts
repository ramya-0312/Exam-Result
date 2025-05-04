import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  standalone:false,
  selector: 'app-admin-revaluation',
  templateUrl: './admin-revaluation.component.html',
  styleUrls: ['./admin-revaluation.component.css']
})
export class AdminRevaluationComponent implements OnInit {
  revaluationRequests: any[] = [];
  loading = true;
  adminEmail:string='';

  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router) {}

  ngOnInit(): void {
    this.fetchRevaluationRequests();
    const storedEmail=localStorage.getItem('adminEmail');
    if(storedEmail){
      this.adminEmail=storedEmail;
    }
  }

  fetchRevaluationRequests(): void {
    this.http.get<any[]>('http://localhost:8080/api/revaluation/pending').subscribe({
      next: (data) => {
        this.revaluationRequests = data;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load revaluation requests.');
        this.loading = false;
      }
    });
  }

  approveRequest(request: any): void {
    this.http.post('http://localhost:8080/api/revaluation/approve', request).subscribe({
      next: () => {
        this.toastr.success('Request approved');
        this.fetchRevaluationRequests();
      },
      error: () => this.toastr.error('Failed to approve request')
    });
  }

  rejectRequest(request: any): void {
    this.http.post('http://localhost:8080/api/revaluation/reject', request).subscribe({
      next: () => {
        this.toastr.success('Request rejected');
        this.fetchRevaluationRequests();
      },
      error: () => this.toastr.error('Failed to reject request')
    });
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/admin-login']);
  }
}
