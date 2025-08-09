import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'http://127.0.0.1:8000'; // Django default port

  constructor(private http: HttpClient) {}

  postJobForm(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/api/jobform/`, data);
  }

  uploadResume(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiURL}/api/upload/`, formData);
  }
}
