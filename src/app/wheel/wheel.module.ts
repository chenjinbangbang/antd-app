import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from 'src/app/module/antd/antd.module';
import { ComponentModule } from 'src/app/module/component/component.module';

import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';
import { WheelService } from 'src/app/service/wheel.service';

import { WheelComponent } from 'src/app/wheel/wheel/wheel.component';
import { WheelSettingComponent } from 'src/app/wheel/wheel-setting/wheel-setting.component';
import { WheelResultComponent } from 'src/app/wheel/wheel-result/wheel-result.component';
import { CandyListComponent } from 'src/app/wheel/candy-list/candy-list.component';

const routes: Routes = [
  { path: '', component: WheelComponent },
  { path: 'wheel-setting', component: WheelSettingComponent },
  { path: 'wheel-result', component: WheelResultComponent },
  { path: 'candy-list', component: CandyListComponent },
]

@NgModule({
  declarations: [
    WheelComponent,
    WheelSettingComponent,
    WheelResultComponent,
    CandyListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FormsModule,
    ReactiveFormsModule,
    AntdModule,
    ComponentModule
  ],
  providers: [
    ApiService,
    CommonService,
    WheelService
  ]
})
export class WheelModule { }
