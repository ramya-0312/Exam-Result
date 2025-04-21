import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/adminregister/admin_register'; // Change this if your backend URL is different

  constructor(private http: HttpClient) {}

  registerAdmin(data: any): Observable<any> {
    return this.http.post('${this.baseUrl}/register', data);
  }

}
