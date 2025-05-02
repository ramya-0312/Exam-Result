import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = history.state;
    this.registered = nav.registerNumber;
    this.dob = nav.dob;

   //this.router.navigate(['/view-result'])
  }

  viewResult(semValue: string) {
    console.log('Clicked View for semester:', semValue);

    const stateData = history.state;
    console.log('Received state:', stateData);

    if (!stateData.registerNumber || !stateData.dob) {
      alert('Missing data, redirecting...');
      this.router.navigate(['/student-result']);
      return;
    }

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/view-result'], {
        state: {
          registerNumber: stateData.registerNumber,
          dob: stateData.dob,
          semester: semValue
        }
      });
    }, 3000);


    this.router.navigate(['/view-result'], {
      state: {
        registerNumber: stateData.registerNumber,
        dob: stateData.dob,
        semester: semValue
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
