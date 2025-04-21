import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = 'http://localhost:8080/adminregister/updatepassword'; // Update if backend URL differs

  constructor(private http: HttpClient) {}

  resetPassword(data:any) {
    return this.http.post(`${this.baseUrl}`, data);
  }
}
