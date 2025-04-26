import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = 'http://localhost:8080/student/postresult';
  constructor(private http: HttpClient) {}

  postResult(resultData: any) {
    return this.http.post<any>(this.baseUrl, resultData)
  }
}
