import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = 'http://localhost:8080/api'; // Update if backend URL differs

  constructor(private http: HttpClient) {}

  resetPassword(data: { email: string; newPassword: string }) {
    return this.http.post('${this.baseUrl}/reset-password', data);
  }
}
