import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  standalone: false,
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {   // <<< OnInit use panrom
  adminEmail: string = '';
  student = {
    registered: '',
    name: '',
    dob: '',
  };
  department = '';

  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      if (!this.authService.isAdminLoggedIn()) {
        this.router.navigate(['/admin-login'], { replaceUrl: true });
      }
    };
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      this.adminEmail = storedEmail;
    }
  }

  private formatDOB(): string {
    const date = new Date(this.student.dob);
    const year = date.getFullYear().toString(); // Only year
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  addStudent(form:NgForm) {
    if (!this.student.registered || !this.student.name || !this.student.dob || !this.department) {
      this.toastr.warning('Please fill all the fields');
      return;
    }

    const formattedStudent = {
      ...this.student,
      dob: this.formatDOB(),
      department: this.department,
      semester: '0'
    };

    this.studentService.addStudent(formattedStudent).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Student added successfully!');
        form.resetForm();

        // After adding, reset form
        this.student = { registered: '', name: '', dob: '' };
        this.department = '';
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Something went wrong');
      }
    });
  }



  confirmLogout() {
      this.authService.clearAdminCredentials();
  localStorage.removeItem('adminEmail');
  localStorage.removeItem('adminPassword');
  this.router.navigate(['/admin-login'], { replaceUrl: true });

  }
}
