import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'http://localhost:8080/reset-password'; // Backend endpoint

  constructor(private http: HttpClient) { }

  resetPassword(admin: any) {
    return this.http.post(this.apiUrl,admin);
}
verifyEmail(email: string) {
  return this.http.get<{ exists: boolean }>('${this.apiUrl}/check-email?email=${email}');
}
}
