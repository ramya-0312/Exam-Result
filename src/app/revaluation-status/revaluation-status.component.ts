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
     this.fetchRevaluationStatus();
    this.route.queryParams.subscribe(params => {
      this.registerNumber = params['regno'];
      this.dob = params['dob'];
      this.semester = params['semester'];
      if (this.registerNumber ) {
        this.fetchRevaluationStatus();
      }
    });
  }

  fetchRevaluationStatus(): void {
    this.http.get<any>(`http://localhost:8080/studentrevalution/gettall?registered=${localStorage.getItem("registerNumber")}`)
      .subscribe(
        (res) => {
          const list = res.response;
      if (list.length > 0) {
        this.revaluationData = {
          ...list[0],
          note: list[0].status === 'pending'
            ? 'Your revaluation request is still pending.'
            : list[0].status === 'updated'
              ? 'Your marks have been updated.'
              : 'Your revaluation request was rejected.'
        };
          } else {
        this.revaluationData = { status: 'not_found' };
      }
    },


        (error) => {
          console.error('Error fetching revaluation status', error);
          this.revaluationData = { status: 'not_found' };
        }
      );
  }
  // fetchRevaluationRequests(): void {
//   this.http.get<any>('http://localhost:8080/api/revaluation/revaluations').subscribe({
//     next: (data) => {
//       console.log('API Response:',data)
//       this.revaluationRequests = data.response;
//       console.log(this.revaluationRequests)
//       this.loading = false;
//     },
//     error: () => {
//       this.toastr.error('Failed to load revaluation requests.');
//       this.loading = false;
//     }
//   });
// }
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
