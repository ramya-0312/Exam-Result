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
  registered:string ='';
  dob :string=''
  loading=false;
  semesters = [
    { name: 'Semester 1', value: '1' },
    { name: 'Semester 2', value: '2' },
    { name: 'Semester 3', value: '3' },
    { name: 'Semester 4', value: '4' }
  ];

  constructor(private router: Router,private http:HttpClient) {}

  ngOnInit() {
    this.registered = localStorage.getItem('registerNumber') || '';
    this.dob = localStorage.getItem('dob') || '';

    if (!this.registered || !this.dob) {
      alert('Session expired. Please login again.');
      this.router.navigate(['/student-result']);
    }
  }
  viewResult(semValue: string) {
    
    const params = new HttpParams()
      .set('registered', this.registered)
      .set('dob', this.dob)
      .set('sem', semValue);
     
    this.loading = true;

    this.http.get('http://localhost:8080/student/viewresult', { params }).subscribe({
      next: (response) => {
        this.loading = false;
        localStorage.setItem('resultData', JSON.stringify(response));
        // localStorage.setItem('resultData', JSON.stringify(data));
        // Store in localStorage for view-result page to use
        localStorage.setItem('selectedSemester', semValue);
       

        this.router.navigate(['/view-result']);
        
        
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
