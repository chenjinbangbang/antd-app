import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaffleService {

  API_URL: string = environment.RaffleService;

  constructor(
    private http: HttpClient
  ) { }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, { params });
  }

  export(path: string, options: object={}): Observable<any> {
    return this.http.get(`${this.API_URL}${path}`, options);
  }

  put(path: string, body): Observable<any> {
    const UPDATE_URL = `${this.API_URL}${path}`;
    return this.http.put(UPDATE_URL, body);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(`${this.API_URL}${path}`, body);
  }

  patch(path: string, body): Observable<any> {
    return this.http.patch(`${this.API_URL}${path}`, body);
  }

  delete(path: string): Observable<any> {
    const USER_DELETE_URL = `${this.API_URL}${path}`;
    return this.http.delete(USER_DELETE_URL);
  }

}
