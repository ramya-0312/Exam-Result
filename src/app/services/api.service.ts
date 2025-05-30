import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/studentrevalution';

  constructor(private http: HttpClient) {}

  getResult(registered: number, semester: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/gettall`, {
      params: {
        registered: registered.toString(),
        semester: semester.toString()
      }
    });
  }
}
