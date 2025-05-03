import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewresultService {
  private baseUrl = 'http://localhost:8080/student/viewresult';

  constructor(private http: HttpClient) {}

  viewResult(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/viewresult`, data);
  }



}
