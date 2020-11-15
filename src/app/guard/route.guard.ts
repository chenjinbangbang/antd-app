import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { WheelSettingComponent } from '../pages/wheel-setting/wheel-setting.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  constructor(private confirmSry: NzModalService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canDeactivate(
    component: WheelSettingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ) {
    console.log('canDeactivate', currentRoute, currentState, nextState);

    return new Observable((observer) => {
      this.confirmSry.confirm({
        nzTitle: "确定不保存就离开吗？",
        // nzContent: "确定不保存就离开吗？",
        nzOkText: "离开",
        nzCancelText: "再看看",
        nzOnOk() {
          observer.next(true);
          observer.complete();
        },
        nzOnCancel() {
          observer.next(false);
          observer.complete();
        }
      })
    })


  }

}
