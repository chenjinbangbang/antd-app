import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { RouteGuard } from 'src/app/guard/route.guard';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { IndexComponent } from 'src/app/pages/wheel/index/index.component'; // 大转盘
// import { WheelComponent } from 'src/app/pages/wheel/wheel/wheel.component';
// import { WheelSettingComponent } from 'src/app/pages/wheel/wheel-setting/wheel-setting.component';
// import { WheelResultComponent } from 'src/app/pages/wheel/wheel-result/wheel-result.component';
// import { ActivityComponent } from 'src/app/pages/activity/activity.component';

import { AccountIndexComponent } from 'src/app/pages/system-account/account-index/account-index.component'; // 系统账号

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
    loadChildren: () => import('../../pages/wheel/wheel.module').then(m => m.WheelModule)
  },
  {
    path: 'system-account',
    component: AccountIndexComponent,
    loadChildren: () => import('../../pages/system-account/system-account.module').then(m => m.SystemAccountModule)
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
