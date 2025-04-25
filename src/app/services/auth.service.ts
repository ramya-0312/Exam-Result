import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginWithGoogleToken(googleToken: string) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/adminregister/login'; // Your login API

  constructor(private http: HttpClient) {}

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(this.baseUrl, credentials);
  }

  // Store admin credentials in localStorage on successful login
  setAdminCredentials(email: string, password: string): void {
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPassword', password);
  }
  

  // Clear credentials on logout
  clearAdminCredentials(): void {
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminPassword');
  }

  // Check if admin is logged in by checking the presence of credentials
  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminEmail') && !!localStorage.getItem('adminPassword');
  }
 
}
