import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { WheelComponent } from 'src/app/pages/wheel/wheel.component';
import { WheelResultComponent } from 'src/app/pages/wheel-result/wheel-result.component';

const routes: Routes = [
  { path: 'wheel', component: WheelComponent },
  { path: 'wheel-result', component: WheelResultComponent },
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
