import {HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
//import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
//import { ViewResultComponent } from './view-result/view-result.component';
//import { StudentResultComponent } from './student-result/student-result.component';
//import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { PostResultComponent } from './post-result/post-result.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SelectSemesterComponent } from './select-semester/select-semester.component';
import { GoogleLoginProvider,GoogleSigninButtonModule,SocialAuthServiceConfig,SocialLoginModule } from '@abacritt/angularx-social-login';
import { StudentAuthGuard } from './guards/student-auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminLoginComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    AddStudentComponent,
    AdminRegisterComponent,
    RegistrationSuccessComponent,
    StudentResultComponent,
    ViewResultComponent,
    ResetPasswordComponent,
    PostResultComponent,
    SelectSemesterComponent

],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule ,
    SocialLoginModule,
    GoogleSigninButtonModule,

    //AdminRegistrationComponent,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true

    })



  ],

  providers: [{
    provide:'SocialAuthServiceConfig',
    useValue:{
      autologin:false,
      providers:[
        {
          id:GoogleLoginProvider.PROVIDER_ID,
          provider:new GoogleLoginProvider('1002182901459-ssdh7u0injaeesd2kindckpmqk1aia82.apps.googleusercontent.com')
        }
      ],onError:(err)=>{
        console.log(err);
      }
    }as SocialAuthServiceConfig
  }
,[StudentAuthGuard]],
  bootstrap: [AppComponent]
})
export class AppModule { }
