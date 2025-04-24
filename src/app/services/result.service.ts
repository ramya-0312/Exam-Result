
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = 'http://localhost:8080/api/result'; // Adjust URL as per your backend

  constructor(private http: HttpClient) {}

  getResult(registerNumber: string, dob: string,semester:string): Observable<any> {
    const body = {
      registerNumber: registerNumber,
      dob: dob,
      semester:semester

    };

    return this.http.post('${this.baseUrl}/view', body);
  }
}
