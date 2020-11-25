import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://devraffleserviceapi.fortunepay.com.ph';
  baseUrl1: string = 'https://devbackendapi.fortunepay.com.ph';

  constructor(private http: HttpClient) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    if(['/api/profile', '/api/region-list', '/api/province-list', '/api/city-municipality-list'].includes(path)) {
      this.baseUrl = 'https://devbackendapi.fortunepay.com.ph';
    }

    return this.http.get(`${this.baseUrl}${path}`, { params });
  }

  export(path: string, options: object = {}): Observable<any> {
    return this.http.get(`${this.baseUrl}${path}`, { ...options, responseType: 'text' });
  }

  put(path: string, body): Observable<any> {
    return this.http.put(`${this.baseUrl}${path}`, body);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }

  patch(path: string, body): Observable<any> {
    return this.http.patch(`${this.baseUrl}${path}`, body);
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${path}`);
  }


}
