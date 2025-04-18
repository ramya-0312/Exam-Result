import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student = {
    registerNo: '',
    name: '',
    dob: '',
    college: '',
    semester: null
  };

  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  addStudent() {
    this.studentService.addStudent(this.student).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Student added successfully!');
        // Optionally, reset the form
        this.student = {
          registerNo: '',
          name: '',
          dob: '',
          college: '',
          semester: null
        };
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Something went wrong');
      }
    });
  }

  logout() {
    this.router.navigate(['/admin-login']);
  }
}
