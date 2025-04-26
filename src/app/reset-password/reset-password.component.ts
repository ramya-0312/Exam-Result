import { Component } from '@angular/core';
import { ResetPasswordService } from '../services/resetpassword.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  email = localStorage.getItem('resetEmail') || '';
  Password = '';
  confirmPassword = '';

  constructor(
    private resetService: ResetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get isValidPassword(): boolean {
    const hasUppercase = /[A-Z]/.test(this.Password);
    const hasSymbol = /[^A-Za-z0-9]/.test(this.Password);
    return hasUppercase && hasSymbol;
  }

  get isPasswordMatch(): boolean {
    return this.Password === this.confirmPassword;
  }

  get isFormValid(): boolean {
    return this.email !== '' && this.isValidPassword && this.isPasswordMatch;
  }

  resetPassword() {
    if (!this.isFormValid) {
      this.toastr.error('Please check password requirements!');
      return;
    }

    const payload = {
      email: this.email,
      password: this.confirmPassword
    };

    this.resetService.resetPassword(payload).subscribe({
      next: (res: any) => {
        this.toastr.success(res.response);
        localStorage.removeItem('emailVerified');
        localStorage.removeItem('resetEmail');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error.message);
      }
    });
  }
}
