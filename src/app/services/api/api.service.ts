import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = environment.apiBaseUrl; // Django default port

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
