import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { RouteGuard } from 'src/app/guard/route.guard';

import { HomeComponent } from 'src/app/home/home.component';
import { IndexComponent } from 'src/app/wheel/index/index.component'; // 大转盘

import { AccountIndexComponent } from 'src/app/system-account/account-index/account-index.component'; // 系统账号

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'wheel', 
    component: IndexComponent,
    // children: [
    //   { path: '', component: WheelComponent },
    //   { path: 'wheel-setting', component: WheelSettingComponent },
    //   { path: 'wheel-result', component: WheelResultComponent },
    // ]
    loadChildren: () => import('../../wheel/wheel.module').then(m => m.WheelModule)
  },
  {
    path: 'system-account',
    component: AccountIndexComponent,
    loadChildren: () => import('../../system-account/system-account.module').then(m => m.SystemAccountModule)
  }
  // { path: 'wheel-setting', component: WheelSettingComponent, canDeactivate: [RouteGuard] },
  // { path: 'activity', component: ActivityComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
