import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email= '';
  Password='';
  emailverified=true;


  constructor(private http: HttpClient, private router: Router, private toastr:ToastrService) {}

  checkEmail() {
    this.http.post('http://localhost:8080/adminregister/checkmail', { email: this.email }).subscribe({
      next: (res:any) => {
        localStorage.setItem('resetEmail', this.email);// Store email
        this.toastr.success(res?.message);
        this.router.navigate(['/reset-password']);      // Navigate to reset page
      },
      error: (err) => {
        const errorMessage = err?.error?.message;
        this.toastr.error(errorMessage);
      }
    });
  }
}
