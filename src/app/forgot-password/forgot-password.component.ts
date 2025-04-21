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
  verifiedEmail:string='';
  successMessage:string='';

  constructor(private passwordService: PasswordService,private toastr:ToastrService,private router:Router) {}


  checkEmail() {
    const data = {email:this.email}; // send as body
      this.passwordService.verifyEmail(data).subscribe(
        (res:any) => {
          if (res.exists) {
            this.emailVerified = true;
            this.verifiedEmail=this.email;  // store the verifiedEmail
            this.successMessage=res.message;
            this.toastr.success(res.message);
          } else {
            this.toastr.error(res.message);
          }
        },
        (error) => {
          this.toastr.error(error.error.message);
        }
      );
    }


  resetPassword() {

    if (!this.emailVerified){
      this.toastr.error('please verify your email first.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Passwords do not match. Please re-enter.');
      return;
    }

    const data = {
      email: this.email,
      newPassword: this.newPassword
    };

    this.passwordService.resetPassword(data).subscribe({
      next: (res:any) => {
        this.toastr.success(res.message);
        this.emailVerified = false;
        this.verifiedEmail='';
        this.email='';
        this.newPassword = '';
        this.confirmPassword = '';

        setTimeout(() => {
          this.router.navigate(['/admin-login']);  // update the route if needed
        }, 1500); // 1.5 sec delay before redirecting
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }
}


