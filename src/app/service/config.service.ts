import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  /**
   * 请求方法
   * @param url 请求路径
   * @param method 请求方法
   * @param params 请求参数
   */
  request(url: string = '', method: string = 'GET', params: any = {}) {
    return new Observable((observer) => {
      let headers: any = {
        Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpiMjF3WVc1NVgybGtJam9pTkdKbU56TTFaVGszTWpZNU5ESXhZVGd3WWpneU16VTVaVGRrWXpJeU9EZ2lMQ0p6WlhOemFXOXVTV1FpT2lKaE9UVmxORGczWWkwNU5qSm1MVFEwTWpBdFlqSTBOeTAwWmpsbVl6YzJZemt4WW1Vak1UWXdOREE1T1RBMk1UYzRNeU14TmpBME1EazVNell4Tnpneklpd2lZWFYwYUV4bGRtVnNJam9pVmtWU1NVWkpSVVFpTENKMWMyVnlTV1FpT2lJNE56UTRNamd6TkdGbU1UazBORGswT0RGaFpqY3lPVFZoTldZMk5tSmlaQ0lzSW5OMVlpSTZJamt4TmpVeE1UWXhOVElpTENKcFlYUWlPakUyTURRd09Ua3dOakVzSW1WNGNDSTZNVFl3TkRFeU1EWTJNWDAuWTRHbDZfd2hQeEtld01xZWM0TGRaeFpSeFJkMDJ0R21FUkNTc1N6UnVkYyIsImNvbXBhbnlfaWQiOiI0YmY3MzVlOTcyNjk0MjFhODBiODIzNTllN2RjMjI4OCJ9.qttMXkb6tsBihpGBiozI1ED5r4FCAF513_QdUExqfnQc5XDAMITbwt9lo5xdrA-V4Enx884Mr6V3lc6ky2hxuQ`
      }

      let options: any = {
        headers
      }

      url = 'https://devraffleserviceapi.fortunepay.com.ph' + url;

      switch (method) {
        case 'GET':
          options.params = params;
          this.http.get(url, options).subscribe((res: any) => {
            // console.log(res);
            if(res.success) {
              observer.next(res.data);
            } else {
              observer.error(res.message);
            }
          })
          break
        case 'POST':
          this.http.post(url, params, options).subscribe((res: any) => {
            // console.log(res);
            if(res.success) {
              observer.next(res);
            } else {
              observer.error(res.message);
            }
          })
          break
        case 'PUT':
          this.http.put(url, params, options).subscribe((res: any) => {
            // console.log(res);
            if(res.success) {
              observer.next(res);
            } else {
              observer.error(res.message);
            }
          })
          break
        case 'PATCH':
          break
        default:
          break
      }
    })

  }
}
