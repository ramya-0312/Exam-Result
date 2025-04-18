import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  standalone:false,
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  isPasswordValid = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  validatePassword() {
    const pwd = this.password;
    this.isPasswordValid =
      pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  }

  register() {
    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
    };

    this.adminService.registerAdmin(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.response || 'Registration successful!');
        this.router.navigate(['/resgistration-success']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Something went wrong');
      }
    });
  }
}
