import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent implements OnInit {
  regNo: string = '';
  dob: string = '';
  resultData = [
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' },
    { sem: '01', code: 'ABC001', grade: 'A', status: 'PASS' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.regNo = params['regNo'];
      this.dob = params['dob'];
      // You can
      //  use these values to call a real API if needed
    });
  }
}
