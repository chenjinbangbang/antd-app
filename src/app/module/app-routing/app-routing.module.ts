import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// import { RouteGuard } from 'src/app/guard/route.guard';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { IndexComponent } from 'src/app/pages/wheel/index/index.component';
// import { WheelComponent } from 'src/app/pages/wheel/wheel/wheel.component';
// import { WheelSettingComponent } from 'src/app/pages/wheel/wheel-setting/wheel-setting.component';
// import { WheelResultComponent } from 'src/app/pages/wheel/wheel-result/wheel-result.component';
// import { ActivityComponent } from 'src/app/pages/activity/activity.component';


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
