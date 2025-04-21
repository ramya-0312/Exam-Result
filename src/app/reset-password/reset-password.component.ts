import { Component } from '@angular/core';
import { ResetPasswordService } from '../services/resetpassword.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  email = ''; 
  Password = '';
  confirmPassword = '';

  constructor(
    private resetService: ResetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resetPassword() {
    if (this.Password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!', 'Error');
      return;
    }

    const payload = {
      email: this.email,
      password: this.confirmPassword
    };
    
  console.log("Sending payload:", payload);

    this.resetService.resetPassword(payload).subscribe({
      next: (response: any) => {
        const message = response?.message || 'Password reset successful!';
        this.toastr.success(message, 'Success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Failed to reset password';
        this.toastr.error(errorMessage, 'Error');
        console.error(error);
      }
    });
  }
}
