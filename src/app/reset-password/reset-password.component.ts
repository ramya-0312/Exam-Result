import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) {
      this.email = savedEmail;
    } else {
      alert('No email found. Redirecting to Forgot Password page.');
      this.router.navigate(['/forgot-password']);
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      email: this.email,
      newPassword: this.newPassword
    };

    this.http.post('http://localhost:8080/api/reset-password', payload).subscribe({
      next: (res) => {
        alert("Password reset successful!");
        localStorage.removeItem('resetEmail');
        this.router.navigate(['/admin-login']);
      },
      error: (err) => {
        alert("Password reset failed.");
      }
    });
  }
}
