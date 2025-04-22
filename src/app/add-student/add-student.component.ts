import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  student = {
  registered: '',
    name: '',
    dob: '',
    
  };
  department = '';

  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private formatDOB(): string {
    const date = new Date(this.student.dob);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  addStudent() {
    if (!this.student.registered || !this.student.name || !this.student.dob || !this.department) {
      this.toastr.warning('Please fill all the fields');
      return;
    }

    const formattedStudent = {
      ...this.student,
      dob: this.formatDOB(),
      department: this.department,
    };

    this.studentService.addStudent(formattedStudent).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Student added successfully!');
        this.router.navigate(['/admin-dashboard']);
        this.student = { registered: '', name: '', dob: '' };
        this.department = '';
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
