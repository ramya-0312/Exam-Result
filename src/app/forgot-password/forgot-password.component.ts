import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword:string='';
  emailverified=true;


  constructor(private http: HttpClient, private router: Router) {}

  checkEmail() {
    this.http.post('http://localhost:8080/api/verify-email', { email: this.email }).subscribe({
      next: (res) => {
        localStorage.setItem('resetEmail', this.email); // Store email
        this.router.navigate(['/reset-password']);      // Navigate to the reset page
      },
      error: (err) => {
        alert('Email verification failed!');
      }
    });
  }
}
