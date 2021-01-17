import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { RaffleService } from './raffle.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private apiService: ApiService,
    private raffleService: RaffleService
  ) { }

  // 获取地区列表
  getRegionList(country_id = null): Observable<any> {
    let url = '/region-list';
    if (country_id) {
      url += `?country_id=${country_id}`;
    }
    return this.apiService.get(url).map(response => {
      return response.data;
    })
  }

  // 获取省份列表
  getProvinceList(code = null): Observable<any> {
    let url = '/province-list';  
    if(code) {
      url += `?region_code=${code}`
    }
    return this.apiService.get(url).map(response => {
      return response.data;
    })
  }

  // 获取城市列表
  getCityMunicipalityList(code = null): Observable<any> {
    let url = '/city-municipality-list';  
    if(code) {
      url += `?province_code=${code}`
    }
    return this.apiService.get(url).map(response => {
      return response.data;
    })
  }

  // 上传文件
  imageUpload(data): Observable<any> {
    return this.raffleService.post('/setting/v1/image/upload', data).map(response => {
      return response.data;
    })
  }
}
