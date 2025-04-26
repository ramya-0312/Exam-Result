import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  checkEmail() {
    // Optional: Clear previous localStorage values
    localStorage.removeItem('resetEmail');
    localStorage.removeItem('emailVerified');

    this.http.post('http://localhost:8080/adminregister/checkmail', { email: this.email }).subscribe({
      next: (res: any) => {
        localStorage.setItem('resetEmail', this.email);
        localStorage.setItem('emailVerified', 'true');
        this.toastr.success(res.message || 'Email verified');
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Invalid email or server error');
      }
    });
  }
}
