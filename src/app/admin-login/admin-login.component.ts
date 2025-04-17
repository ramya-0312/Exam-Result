import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email = '';
  password = '';
  wrongAttempts = 0;
  showForgotPassword = false;
  errorMessage='';
  formValid=false;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.loginAdmin(credentials).subscribe({
      next: (res: any) => {
        this.toastr.success(res.response);
        this.router.navigate(['/admin-dashboard']);
      },
      error: (err) => {
        this.wrongAttempts++;
        this.toastr.error(err.error.message);
        if (this.wrongAttempts >= 2) {
          this.showForgotPassword = true;
        }
      }
    });
  }

  updateFormValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pwd = this.password;

    const emailValid = emailRegex.test(this.email);
    const passwordValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

    this.formValid = emailValid && passwordValid;
  }
}
