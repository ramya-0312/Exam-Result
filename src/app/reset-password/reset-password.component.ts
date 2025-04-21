import { Component } from '@angular/core';
import { ResetPasswordService } from '../services/resetpassword.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  email: string = ''; // Set this from previous step (can use state or localStorage)
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private resetService: ResetPasswordService, private router: Router) {}

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const payload = {
      email: this.email,
      password: this.confirmPassword
    };
    
  console.log("Sending payload:", payload);

    this.resetService.resetPassword(payload).subscribe({
      next: () => {
        alert('Password reset successful!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to reset password');
      }
    });
  }
}
