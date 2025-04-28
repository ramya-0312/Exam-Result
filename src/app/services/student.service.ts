import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/student/addstd'; // our backend endpoint

  constructor(private http: HttpClient) {}

  addStudent(student: any) {
    return this.http.post(`${this.baseUrl}`, student);
}
}
