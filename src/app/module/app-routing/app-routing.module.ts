import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuard } from 'src/app/guard/route.guard';

import { WheelComponent } from 'src/app/pages/wheel/wheel.component';
import { WheelSettingComponent } from 'src/app/pages/wheel-setting/wheel-setting.component';
import { WheelResultComponent } from 'src/app/pages/wheel-result/wheel-result.component';
import { ActivityComponent } from 'src/app/pages/activity/activity.component';


const routes: Routes = [
  { path: 'wheel', component: WheelComponent },
  { path: 'wheel-setting', component: WheelSettingComponent, canDeactivate: [RouteGuard] },
  { path: 'wheel-result', component: WheelResultComponent },
  { path: 'activity', component: ActivityComponent },
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
