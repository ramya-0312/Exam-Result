import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/admincontroller/admin/login'; // Change based on our backend

  constructor(private http: HttpClient) {}

  loginAdmin(credentials: any):Observable<any> {
    return this.http.post(this.baseUrl, credentials);
  }

}
