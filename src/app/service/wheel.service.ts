import { Injectable } from '@angular/core';
import { Observable, from, interval, of, pipe } from 'rxjs';
import { ApiService } from './api.service';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WheelService {

  constructor(private apiService: ApiService) { }

  // get the rotary table page（获取大转盘列表）
  getRotaryTable(params): Observable<any> {
    return this.apiService.get('/api/setting/v1/rotary/table', params).map(res => {
      return res.data;
    })

    // const data = from(this.apiService.get(url, params));
    // console.log('----',data)
    // data.subscribe({
    //   next(res) { console.log('next', res) },
    //   error(err) { console.log('error', err) },
    //   complete() { console.log('Completed') }
    // })

    // 倒计时，从0开始
    // const secondsCounter = interval(1000);
    // secondsCounter.subscribe(n => {
    //   console.log('interval：' + n);
    // })

    // const nums = of(1,2,3);
    // const squareValues = map((val: number) => val * val);
    // const squaredNums = squareValues(nums);
    // squaredNums.subscribe(x => console.log(x));

    // pipe：管道可以把多个由操作符返回的函数组合成一个
    // const nums = of(1,2,3,4,5);
    // const squareOddVals = pipe(filter((n: number) => n % 2 !== 0), map(n => n * n));
    // const squareOdd = squareOddVals(nums);
    // squareOdd.subscribe(x => console.log(x));

    // const squareOdd = of(1,2,3,4,5).pipe(filter(n => n % 2 !== 0), map(n => n * n));
    // squareOdd.subscribe(x => console.log(x));
  }

  // update the rotary table status info（更改活动状态）
  tableStatus(data): Observable<any> {
    return this.apiService.put('/api/setting/v1/rotary/table/status', data).map(res => {
      return res.data;
    })
  }

  // delete the rotary table（删除活动）
  deleteRotary(rotaryTableId): Observable<any> {
    return this.apiService.delete(`/api/setting/v1/rotary/table/${rotaryTableId}`).map(res => {
      return res.data;
    })
  }

  // export the rotary table user lottery list to excel（大转盘抽奖结果导出excel）
  lotteryExport(params): Observable<any> {
    return this.apiService.export(`/api/setting/v1/rotary/table/user/lottery/export`, params).map(res => {
      // return res.data;
      console.log('导出excel', res)

      let csvData = res;
      let today = new Date();
      let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      let filename = date.toString()

      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", "txns-" + filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
    })
  }

  // get the rotary table user lottery page（获取大转盘抽奖结果）
  getLottery(params): Observable<any> {
    return this.apiService.get(`/api/setting/v1/rotary/table/user/lottery`, params).map(res => {
      return res.data;
    })
  }

  // Deliver the entity prizes（确认收货）
  lotteryDelivery(data): Observable<any> {
    return this.apiService.post(`/api/setting/v1/rotary/table/user/lottery/delivery`, data).map(res => {
      return res.data;
    })
  }

  // get the rotary table info details（获取某个活动详情）
  rotaryTableDetail(rotaryTableId): Observable<any> {
    return this.apiService.get(`/api/setting/v1/rotary/table/${rotaryTableId}`).map(res => {
      return res.data;
    })
  }

  // save the rotary table info（添加/编辑大转盘活动）
  rotaryTable(data): Observable<any> {
    return this.apiService.post(`/api/setting/v1/rotary/table`, data).map(res => {
      return res.data;
    })
  }

}
