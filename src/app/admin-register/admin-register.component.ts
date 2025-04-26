import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';

@Component({
  standalone: false,
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  department = '';

  // New states for real-time validation
  nameTouched = false;
  emailTouched = false;
  passwordTouched = false;
  confirmPasswordTouched = false;
  departmentTouched = false;

  nameValid = false;
  emailValid = false;
  passwordValid = false;
  confirmPasswordValid = false;
  departmentValid = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  validateName() {
    this.nameTouched = true;
    this.nameValid = this.fullName.trim().length >= 3;
  }

  validateEmail() {
    this.emailTouched = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailValid = emailPattern.test(this.email) && this.email.endsWith('@gmail.com');
  }

  validatePassword() {
    this.passwordTouched = true;
    const pwd = this.password;
    this.passwordValid = pwd.length >= 8 &&
      /[A-Z]/.test(pwd) &&
      /[0-9]/.test(pwd) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    this.validateConfirmPassword(); // confirm password should also be revalidated
  }

  validateConfirmPassword() {
    this.confirmPasswordTouched = true;
    this.confirmPasswordValid = this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  validateDepartment() {
    this.departmentTouched = true;
    this.departmentValid = this.department.trim().length > 0;
  }

  isFormValid() {
    return this.nameValid && this.emailValid && this.passwordValid && this.confirmPasswordValid && this.departmentValid;
  }

  register() {
    const data = {
      name: this.fullName,
      email: this.email,
      password: this.password,
      department: this.department
    };

    this.adminService.registerAdmin(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.response || 'Registration successful!');
        this.router.navigate(['/registration-success']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Something went wrong');
      }
    });
  }
}
