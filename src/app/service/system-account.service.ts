import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SystemAccountService {

  constructor(private userService: UserService) { }

  // audit the system account topup（审核系统账户充值）
  systemAccountTopupAudit(data): Observable<any> {
    return this.userService.put('/system/account/topup/audit', data).map(res => {
      return res.data;
    })
  }

  // get the system account topup record page（获取系统账户充值记录）
  getSystemAccountTopup(data): Observable<any> {
    return this.userService.get('/system/account/topup', data).map(res => {
      return res;
    })
  }

  // save the system account topup record（保存系统账户充值记录）
  systemAccountTopup(data): Observable<any> {
    return this.userService.post('/system/account/topup', data).map(res => {
      return res;
    })
  }

  // get the system account topup details by id（通过ID获取系统账户充值详细信息）
  systemAccountTopupDetail(id): Observable<any> {
    return this.userService.get('/system/account/topup/' + id).map(res => {
      return res;
    })
  }

  // get the system account transaction statistics info（获取系统账户交易统计信息）
  systemAccountTransactionStat(): Observable<any> {
    return this.userService.get('/system/account/transaction/statistics').map(res => {
      return res;
    })
  }

  // get the system account transaction record page（获取系统账户交易记录）
  systemAccountTransaction(data): Observable<any> {
    return this.userService.get('/system/account/transaction', data).map(res => {
      return res;
    })
  }
}
