//import { NgChartsConfiguration } from './../../node_modules/ng2-charts/lib/ng-charts.provider.d';
import {HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgChartsModule } from 'ng2-charts';
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
import { GoogleLoginProvider,GoogleSigninButtonModule,SocialAuthServiceConfig,SocialLoginModule,SocialAuthService,SocialUser } from '@abacritt/angularx-social-login';
import { StudentAuthGuard } from './guards/student-auth.guard';
//import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { ThemeService } from './services/theme.service';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { NgChartsModule } from 'ng2-charts';
import { AdminAnalyticsComponent } from './admin-analytics/admin-analytics.component';
import { RevaluationComponent } from './revaluation/revaluation.component';
import { AdminRevaluationComponent } from './admin-revaluation/admin-revaluation.component';
import { StudentAnalyticsComponent } from './student-analytics/student-analytics.component';
import { RevaluationStatusComponent } from './revaluation-status/revaluation-status.component';
import { AdminUpdateResultComponent } from './admin-update-result/admin-update-result.component';




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
    SelectSemesterComponent,


    StudentProfileComponent,
      AdminAnalyticsComponent,
      RevaluationComponent,
      AdminRevaluationComponent,
      StudentAnalyticsComponent,
      RevaluationStatusComponent,
      AdminUpdateResultComponent,



],
  imports: [
    BrowserModule,
   NgChartsModule,
    CommonModule,
    FormsModule ,
    SocialLoginModule,
    GoogleSigninButtonModule,
    ReactiveFormsModule,


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

  providers:[{
    provide:'SocialAuthServiceConfig',
    useValue:{
      autoLogin:false,
      providers:[
        {
          id:GoogleLoginProvider.PROVIDER_ID,
          provider:new GoogleLoginProvider('615681002509-2ich3kbbngfffkr5ibnn4t1t9tej8c8u.apps.googleusercontent.com')
        }
      ],onError:(err)=>{
        console.log(err);
      }
    }as SocialAuthServiceConfig
  }
,[StudentAuthGuard],[ThemeService]],

  bootstrap: [AppComponent]
})
export class AppModule { }
