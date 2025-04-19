
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultService } from '../services/result.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone:false,
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.css']
})
export class StudentResultComponent {
  resultForm: FormGroup;
  resultData: any;
  isResultVisible = false;
  isLoading = false;
  regNo:string='';
  dob:string='';
  resultFetched:boolean=false;
  subjects:{name:string;marks:number}[]=[];
  totalMarks:number=0;
  resultStatus:string='';


  getResult() {
    // Dummy test data
    this.subjects = [
      { name: 'Tamil', marks: 80 },
      { name: 'English', marks: 75 },
      { name: 'Maths', marks: 90 },
      { name: 'Science', marks: 85 },
      { name: 'Social Science', marks: 70 },
    ];

    this.totalMarks = this.subjects.reduce((sum, sub) => sum + sub.marks, 0);
    const maxMarks = this.subjects.length * 100;
    const percentage = (this.totalMarks / maxMarks) * 100;
    this.resultStatus = percentage >= 50 ? 'Pass' : 'Fail';
    this.resultFetched = true;
  }

  constructor(
    private fb: FormBuilder,
    private resultService: ResultService,
    private toastr: ToastrService
  ) {
    this.resultForm = this.fb.group({
      registerNumber: ['', [Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      dob: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.resultForm.invalid) {
      this.toastr.error('Please fill out all fields correctly');
      return;
    }

    const { registerNumber, dob } = this.resultForm.value;
    this.isLoading = true;

    this.resultService.getResult(registerNumber, dob).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.resultData = res;
        this.isResultVisible = true;
      },
      (err) => {
        this.isLoading = false;
        this.toastr.error(err.error.message || 'No result found or invalid details');
        this.isResultVisible = false;
      }
    );
  }
}
