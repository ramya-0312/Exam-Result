import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://localhost:8080/adminregister/checkmail'; 
  private apiUrlreset = 'http://localhost:8080/adminregister/updatepassword';// Backend endpoint

  constructor(private http: HttpClient) { }

  verifyEmail(data: any) {
    return this.http.post(this.apiUrl, data); // /checkmain
  }
  
  resetPassword(data: any) {
    return this.http.post(this.apiUrlreset, data);
  }
  
}
