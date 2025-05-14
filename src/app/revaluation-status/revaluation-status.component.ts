import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  standalone:false,
  selector: 'app-revaluation-status',
  templateUrl: './revaluation-status.component.html',
  styleUrls: ['./revaluation-status.component.css']
})
export class RevaluationStatusComponent implements OnInit {

  registerNumber: string = '';
  dob: string = '';
  semester: string = '';
  revaluationData: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.registerNumber = params['regno'];
      this.dob = params['dob'];
      this.semester = params['semester'];
      if (this.registerNumber && this.dob && this.semester) {
        this.fetchRevaluationStatus();
      }
    });
  }

  fetchRevaluationStatus(): void {
    this.http.get<any>(`http://localhost:8080/api/revaluation/status?regno=${this.registerNumber}&dob=${this.dob}&semester=${this.semester}`)
      .subscribe(
        (response) => {
          this.revaluationData = response;
        },
        (error) => {
          console.error('Error fetching revaluation status', error);
          this.revaluationData = { status: 'not_found' };
        }
      );
  }
  viewResult(): void {
  this.router.navigate(['/view-result'], {
    queryParams: {
      regno: this.registerNumber,
      dob: this.dob,
      semester: this.semester
}
});
}
 confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
