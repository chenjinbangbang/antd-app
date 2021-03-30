import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient, private message: NzMessageService) { }

  /**
   * 请求方法
   * @param url 请求路径
   * @param method 请求方法
   * @param params 请求参数
   */
  request(url: string = '', method: string = 'GET', params: any = {}) {
    return new Observable((observer) => {


      let httpOptions: any = {
        // headers: new HttpHeaders({
        //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SmpiMjF3WVc1NVgybGtJam9pTkdKbU56TTFaVGszTWpZNU5ESXhZVGd3WWpneU16VTVaVGRrWXpJeU9EZ2lMQ0p6WlhOemFXOXVTV1FpT2lKaE9UVmxORGczWWkwNU5qSm1MVFEwTWpBdFlqSTBOeTAwWmpsbVl6YzJZemt4WW1Vak1UWXdOREE1T1RBMk1UYzRNeU14TmpBME1EazVNell4Tnpneklpd2lZWFYwYUV4bGRtVnNJam9pVmtWU1NVWkpSVVFpTENKMWMyVnlTV1FpT2lJNE56UTRNamd6TkdGbU1UazBORGswT0RGaFpqY3lPVFZoTldZMk5tSmlaQ0lzSW5OMVlpSTZJamt4TmpVeE1UWXhOVElpTENKcFlYUWlPakUyTURRd09Ua3dOakVzSW1WNGNDSTZNVFl3TkRFeU1EWTJNWDAuWTRHbDZfd2hQeEtld01xZWM0TGRaeFpSeFJkMDJ0R21FUkNTc1N6UnVkYyIsImNvbXBhbnlfaWQiOiI0YmY3MzVlOTcyNjk0MjFhODBiODIzNTllN2RjMjI4OCJ9.qttMXkb6tsBihpGBiozI1ED5r4FCAF513_QdUExqfnQc5XDAMITbwt9lo5xdrA-V4Enx884Mr6V3lc6ky2hxuQ`,
        //   // 'Content-Type': 'multipart/form-data'
        // })
      }

      if(['/profile', '/region-list', '/province-list', '/city-municipality-list'].includes(url)) {
        url = 'https://devbackendapi.fortunepay.com.ph' + url;
      } else {
        url = 'https://devraffleserviceapi.fortunepay.com.ph' + url;
      }
      

      // 导出excel
      if (url.includes('/setting/v1/rotary/table/user/lottery/export')) {
        httpOptions.headers = httpOptions.headers.set('responseType', 'text');
        // httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
      }

      switch (method) {
        case 'GET':
          httpOptions.params = params;
          // console.log('请求参数；',httpOptions)
          this.http.get(url, httpOptions).subscribe((res: any) => {
            console.log('响应数据：', res);

            // 导出excel
            if (url.includes('/setting/v1/rotary/table/user/lottery/export')) {
              let disposition = res.headers['content-disposition'] || res.headers['Content-Disposition'];
              if(disposition) {
                let filename = disposition ? decodeURIComponent(disposition.split(':')[1]) : new Date().getTime() + '.xls';
                if(filename[0] === '"') {
                  filename = filename.substring(1);
                }
                if(filename[filename.length - 1] === '"') {
                  filename = filename.substring(0, filename.length - 1);
                }

                // console.log(res);

                // 下载文件（res：包含data: blob文件）
                if ("msSaveBlob" in navigator) {
                  window.navigator.msSaveBlob(res.data, filename);
                } else if ("download" in document.createElement("a")) {
                  if (!res.data) {
                    return;
                  }
                  let url = window.URL.createObjectURL(new Blob([res.data]));
                  // console.log(url);
                  let link = document.createElement("a");
                  link.style.display = "none";
                  link.href = url;
                  link.setAttribute("download", filename);
                  document.body.appendChild(link);
                  link.click();
                }

                observer.next({ data: res.data, filename });
              }
              return;
            }

            if (res.success) {
              observer.next(res.data);
            } else {
              this.message.error(res.message);
              observer.error(res.message);
            }
          }, err => {
            console.log('请求失败', err);
          })
          break
        case 'POST':

          // 上传文件
          // if (url.includes('/setting/v1/image/upload')) {
          //   httpOptions.headers = httpOptions.headers.set('Content-Type', 'multipart/form-data');

          //   console.log('文件', params)

          //   params = formData;
          // }

          // url = 'http://localhost:4000/basic/upload';

          this.http.post(url, params, httpOptions).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              observer.next(res);
            } else {
              this.message.error(res.message);
              observer.error(res.message);
            }
          })
          break
        case 'PUT':
          this.http.put(url, params, httpOptions).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              observer.next(res);
            } else {
              this.message.error(res.message);
              observer.error(res.message);
            }
          })
          break
        case 'DELETE':
          this.http.delete(url, httpOptions).subscribe((res: any) => {
            // console.log(res);
            if (res.success) {
              observer.next(res);
            } else {
              this.message.error(res.message);
              observer.error(res.message);
            }
          })
          break
        default:
          break
      }
    })

  }
}
