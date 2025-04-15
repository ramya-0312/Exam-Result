import { PasswordService } from './../services/password.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']

})
export class ForgotPasswordComponent {
  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  emailVerified:boolean=false;

  constructor(private passwordService: PasswordService,private toastr:ToastrService,private router:Router) {}


  checkEmail() {
      this.passwordService.verifyEmail(this.email).subscribe(
        (res) => {
          if (res.exists) {
            this.emailVerified = true;
            this.toastr.success('Email found. You can reset your password.');
          } else {
            this.toastr.error('Email not found. Please try again.');
          }
        },
        (error) => {
          this.toastr.error('Email not found');
        }
      );
    }


  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Passwords do not match. Please re-enter.');
      return;
    }

    const data = {
      email: this.email,
      newPassword: this.newPassword
    };

    this.passwordService.resetPassword(data).subscribe({
      next: (res) => {
        this.toastr.success('Password reset successfully!');
        this.emailVerified = false;
        this.newPassword = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/admin-login']);  // update the route if needed
        }, 1500); // 1.5 sec delay before redirecting
      },
      error: (err) => {
        this.toastr.error('Error resetting password: ' + err.error);
      }
    });
  }
}


