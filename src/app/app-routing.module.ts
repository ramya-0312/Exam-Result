import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
//import { ViewResultComponent } from './view-result/view-result.component';
//import { StudentResultComponent } from './student-result/student-result.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { PostResultComponent } from './post-result/post-result.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { ResultViewComponent } from './view-result/view-result.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'view-result', component: ResultViewComponent},
  //{ path: 'student-result', component: StudentResultComponent},
  //{ path: 'student-result/:regNumber', component: StudentResultComponent},
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'admin-dashboard',component:AdminDashboardComponent},
  { path: 'add-student',component:AddStudentComponent},
  { path: 'post-result',component:PostResultComponent},
  { path: 'admin-register',component:AdminRegisterComponent},
  { path: 'registration-success',component:RegistrationSuccessComponent},
  { path: 'student-result',component:StudentResultComponent},
  { path: 'reset-password',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{}
