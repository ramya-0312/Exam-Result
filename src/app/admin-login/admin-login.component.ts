import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

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
  emailTouched=false;
  passwordTouched=false;
  emailValid=false;
  passwordValid=false;
  // socialAuthService: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService,
  ) {}
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      if (user) {
        this.handleGoogleLogin(user);
      }
    });
  }
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
          localStorage.setItem('adminEmail',this.email)
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
  // handleGoogleLogin(user: SocialUser): void {
  //   const email = user.email;

  //   // If your backend accepts just email, send it directly
  //   const credentials = {
  //     email: email,
  //     password: '' // or omit if not needed
  //   };

  //   this.authService.loginAdmin(credentials).subscribe({
  //     next: (res: any) => {
  //       if (res && res.response === 'login Successfully') {
  //         this.authService.setAdminCredentials(email, '');
  //         this.toastr.success(res.response);
  //         this.router.navigate(['/admin-dashboard']);
  //       } else {
  //         this.toastr.error('Google login failed');
  //       }
  //     },
  //     error: (err) => {
  //       this.toastr.error('Login error');
  //       console.error(err);
  //     }
  //   });
  // }
  handleGoogleLogin(user: SocialUser): void {
    // this.authService.loginAdmin({ email: user.email, password: '' }).subscribe({
    //   next: (res: any) => {
    //     if (res?.response.includes('login Successfully')) {
    //       this.authService.setAdminCredentials(user.email, '');
    //       this.toastr.success(res.response);
    //       this.router.navigate(['/admin-dashboard']);
    //     } else {
    //       this.toastr.error('Google login failed');
    //     }
    //   },
    //   error: (err) => {
    //     this.toastr.error('Login error');
    //     console.error(err);
    //   }
    // });
    localStorage.setItem('adminEmail',user.email);
    this.router.navigate(['/admin-dashboard']);

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

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  
validateEmail() {
  this.emailTouched = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  this.emailValid = emailPattern.test(this.email) && this.isGmailAddress();
}

validatePassword() {
  this.passwordTouched = true;
  this.passwordValid = this.password.length >= 6; // Example rule: 6 characters
}
}
