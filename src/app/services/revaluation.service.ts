import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevaluationService {
  private apiUrl = 'http://localhost:8080/api/revaluation/pending';

  constructor(private http: HttpClient) {}

  getPendingRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  approveRequest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve`, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  rejectRequest(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reject`, request, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
