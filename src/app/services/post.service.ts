import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  postResult(resultData: any) {
    return this.http.post<any>('${this.baseUrl}/results/post', resultData);
  }
}
