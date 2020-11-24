import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from 'src/app/module/antd/antd.module';

import { WheelComponent } from 'src/app/pages/wheel/wheel/wheel.component';
import { WheelSettingComponent } from 'src/app/pages/wheel/wheel-setting/wheel-setting.component';
import { WheelResultComponent } from 'src/app/pages/wheel/wheel-result/wheel-result.component';
import { UploadComponent } from 'src/app/components/upload/upload.component';

const routes: Routes = [
  { path: '', component: WheelComponent },
  { path: 'wheel-setting', component: WheelSettingComponent },
  { path: 'wheel-result', component: WheelResultComponent },
]

@NgModule({
  declarations: [
    WheelComponent,
    WheelSettingComponent,
    WheelResultComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    FormsModule,
    ReactiveFormsModule,
    AntdModule
  ]
})
export class WheelModule { }
