import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = 'http://localhost:8080/adminregister/updatepassword'; // Update if backend URL differs

  constructor(private http: HttpClient) {}

  resetPassword(data: any) {
    // return this.http.post('${this.baseUrl}/reset-password', data);
    return this.http.post(`${this.baseUrl}`, data); // Since your backend endpoint is already /updatepassword

  }
}
// export class AuthService {
//   private baseUrl = 'http://localhost:8080/adminregister/login'; // Change based on our backend

//   constructor(private http: HttpClient) {}

//   loginAdmin(credentials: any):Observable<any> {
//     return this.http.post(this.baseUrl, credentials);
//   }