import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class WheelService {

  constructor(private configService: ConfigService) { 
    
  }

  // 获取列表
  // getLists(url, params) {
  //   this.configService.request(url, 'GET', params).subscribe(res => {
  //     console.log(res)
  //   })
  // }
}
