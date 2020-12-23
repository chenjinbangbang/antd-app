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
  getRegionList(params): Observable<any> {
    return this.apiService.get('/region-list', params).map(res => {
      return res;
    })
  }

  // 获取省份列表
  getProvinceList(params): Observable<any> {
    return this.apiService.get('/province-list', params).map(res => {
      return res;
    })
  }

  // 获取城市列表
  getCityMunicipalityList(params): Observable<any> {
    return this.apiService.get('/city-municipality-list', params).map(res => {
      return res;
    })
  }

  // 上传文件
  imageUpload(data): Observable<any> {
    return this.raffleService.post('/setting/v1/image/upload', data).map(res => {
      return res;
    })
  }

}
