import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL: string = environment.APIEndpoint;

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { params });
  }

  export(path: string, options: object = {}): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { ...options, responseType: 'blob' });
  }

  put(path: string, body): Observable<any> {
    return this.http.put(`${this.API_URL}${path}`, body);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(`${this.API_URL}${path}`, body);
  }

  patch(path: string, body): Observable<any> {
    return this.http.patch(`${this.API_URL}${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.API_URL}${path}`);
  }


}
