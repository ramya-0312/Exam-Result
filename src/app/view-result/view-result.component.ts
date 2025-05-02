import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone:false,
  selector: 'app-result-view',
  templateUrl: './view-result.component.html',
})
export class ViewResultComponent implements OnInit {
  student: any;
  activeTab: string = 'profile'; // Default profile view
  loadingResult: boolean = false;  // Spinner state
 //selectedSemester:string='';
 registered='';
 dob='';
 semester='';
 resultData=''

  constructor(private router: Router,private http:HttpClient) {}

  ngOnInit() {
    const data = history.state;
    console.log('Recieved in viewresultcomponent:',data)
    if (!data||!data.registerNumber || !data.dob || !data.semester) {
      this.router.navigate(['/student-result']); // fallback
      return;
    }

    this.registered = data.registerNumber;
    this.dob = data.dob;
    this.semester = data.semester;

    const requestBody = {
      registerNumber: this.registered,
      dob: this.dob,
      semester: this.semester
    };

    this.http.post('http://localhost:8080/student/viewresult', requestBody).subscribe((res: any) => {
      this.student = res.studentDetails;
      this.resultData = res.result;
      console.log('navigation state:', history.state);
    });
  }


  getPercentage(): number {
    if (!this.student?.marks) return 0;
    const totalSubjects = this.student.marks.length;
    const totalMarks = Number(this.student.total);
    return parseFloat(((totalMarks / (totalSubjects * 100)) * 100).toFixed(2));
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  printPage() {
    window.print();
  }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/home']);
  }

}
