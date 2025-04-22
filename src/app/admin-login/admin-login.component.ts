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

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.loginAdmin(credentials).subscribe({
      next: (res: any) => {
        if (res && res.response === 'login Successfully') {
          // On successful login, store email and password in localStorage
          this.authService.setAdminCredentials(this.email, this.password);
          this.toastr.success(res.response);
          this.router.navigate(['/admin-dashboard'],{replaceUrl:true});
        } else {
          this.toastr.error('Invalid login response');
        }
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


  isGmailAddress(): boolean {
    return this.email.toLowerCase().endsWith('@gmail.com');
  }

  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.password.length > 0 && this.isGmailAddress();
  }
}
