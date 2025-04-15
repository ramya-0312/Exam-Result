import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
//import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { StudentResultComponent } from './student-result/student-result.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'admin-register', component: AdminRegistrationComponent },
  { path: 'view-result', component: ViewResultComponent },
  { path: 'student-result', component: StudentResultComponent },
  { path: 'student-result/:regNumber', component: StudentResultComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{}
