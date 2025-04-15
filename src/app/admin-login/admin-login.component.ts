
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
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

  constructor(private authService:AuthService,private router:Router,private toastr:ToastrService) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.loginAdmin(credentials).subscribe({
      next: (res: any) => {
        // Assuming success response
        this.toastr.success(res.response);
        this.router.navigate([''])
      },
      error: (err) => {
          this.wrongAttempts++; // Increment on wrong login
          this.toastr.error(err.error.message)

          if(this.wrongAttempts>=2){
            this.showForgotPassword=true;
          }
        }
     });
   }
}
