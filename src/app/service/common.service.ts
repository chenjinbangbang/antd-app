import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private apiService: ApiService) { }

  // 获取地区列表
  getRegionList(params): Observable<any> {
    return this.apiService.get('/api/region-list', params).map(res => {
      return res.data;
    })
  }

  // 获取省份列表
  getProvinceList(params): Observable<any> {
    return this.apiService.get('/api/province-list', params).map(res => {
      return res.data;
    })
  }

  // 获取城市列表
  getCityMunicipalityList(params): Observable<any> {
    return this.apiService.get('/api/city-municipality-list', params).map(res => {
      return res.data;
    })
  }

  // 上传文件
  imageUpload(data): Observable<any> {
    return this.apiService.post('/api/setting/v1/image/upload', data).map(res => {
      return res.data;
    })
  }

}
