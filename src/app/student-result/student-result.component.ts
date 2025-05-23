//import { SelectSemesterComponent } from './../select-semester/select-semester.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ResultService } from '../services/result.service';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  standalone: false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
})
export class StudentResultComponent {
  registered:string='';
 dob:string ='';
 semester:string='';
 resultData=''
  


  constructor(
    private router: Router,
    private resultService: ResultService,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private http:HttpClient
    //private themeService:ThemeService

  ) {}

  private getFormattedDOB(): string {
    const date = new Date(this.dob);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  viewSemesters() {
    this.getResult
    if (!this.registered || !this.dob) {
      this.toastr.error('Please fill all fields including semester.', 'Error');
      return;
    }

    const studentData = {
      registerNumber: this.registered,
      dob: this.dob
    };

    this.router.navigate(['/student-profile'], {
      queryParams: studentData  // Use queryParams to send as URL params
    });
}

   // this.router.navigate(['/student-profile'], { state: studentData })

   getResult() {
    if (!this.registered?.trim() || !this.dob?.trim()) {
      this.toastr.error('Please fill all fields including semester.', 'Error');
      return;
    }

    const formattedDob = this.getFormattedDOB();

    this.resultService.getResult(this.registered, formattedDob).subscribe({
      next: (data: any) => {
        if (data?.status==='OK'|| data?.status===200) {
          const studentData = data.response;

          console.log(data);
          this.toastr.success( 'Success');
          localStorage.setItem('studentResult', JSON.stringify(studentData));
          localStorage.setItem('registerNumber',studentData.registered);
          localStorage.setItem('dob',studentData.dob);
          // localStorage.setItem('semester', this.selectedSemester);
          localStorage.setItem('studentAuth', 'true');
          this.router.navigate(['/student-profile']);

        }
      },
      error: (err:any) => {
        this.toastr.error(err?.error?.message || 'Invalid details');
      }
    });
  }
// getResult(){
backToHome() {
  this.router.navigate(['/home']);
}

}
