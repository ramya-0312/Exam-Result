import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpParams} from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-select-semester',
  templateUrl: './select-semester.component.html',
  styleUrls: ['./select-semester.component.css']
})
export class SelectSemesterComponent implements OnInit {
  selectedSemester: string = '';
  registered='';
  dob=''
  loading=false;
  semesters = [
    { name: 'Semester 1', value: 'sem1' },
    { name: 'Semester 2', value: 'sem2' },
    { name: 'Semester 3', value: 'sem3' },
    { name: 'Semester 4', value: 'sem4' }
  ];

  constructor(private router: Router,private http:HttpClient) {}

  ngOnInit() {
    const nav = history.state;
    this.registered = nav.registerNumber;
    this.dob = nav.dob;

   //this.router.navigate(['/view-result'])
  }

  viewResult(semValue: string) {
    const params = new HttpParams()
      .set('registerNumber', this.registered)
      .set('dob', this.dob)
      .set('semester', semValue);

    this.loading = true;


    this.http.get('http://your-backend-url/api/get-result', { params }).subscribe({
      next: (response) => {
        this.loading = false;


        this.router.navigate(['/view-result'], {
          state: {
            registerNumber: this.registered,
            dob: this.dob,
            semester: semValue,
            resultData: response
          }
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Error:', err);
        alert('Unable to fetch result. Try again later.');
      }
    });
  }
  logout(){
   // this.router.navigate(['/home'])
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}
