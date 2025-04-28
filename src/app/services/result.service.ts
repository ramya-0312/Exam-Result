
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = 'http://localhost:8080/student/viewresult'; // Adjust URL as per your backend

  constructor(private http: HttpClient) {}

  // getResult(registered: string, dob: string): Observable<any> {
  //   const body = {
  //     registered: registered,
  //     dob: dob,
  //   };
  getResult(registered: string, dob: string): Observable<any> {
    // return this.http.post(this.baseUrl, {
    //   params: {
    //     registered,
    //     dob
    //   }
    // });
    return this.http.get(this.baseUrl, { params: { registered, dob } });
  }
  

    // return this.http.get(this.baseUrl);
    // return this.http.post(this.baseUrl, body);
  }

