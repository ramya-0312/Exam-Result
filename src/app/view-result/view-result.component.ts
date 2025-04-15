import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-view-result',
  templateUrl: './view-result.component.html'
})
export class ViewResultComponent {
  registerNumber: string = '';
  dob: string = '';
  errorMsg:string='';

  constructor(private router: Router) {}

  viewResult() {
    const validRegisterNumber = '12345';
    const validDOB = '2000-01-01';

    if (this.registerNumber === validRegisterNumber && this.dob === validDOB) {
      this.errorMsg = '';
      this.router.navigate(['/student-result', this.registerNumber]);
    } else {
      this.errorMsg = 'Invalid Register Number or Date of Birth!';
     }
  }

}
