import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由
import { AppRoutingModule } from './module/app-routing/app-routing.module'; // CLI imports AppRoutingModule

// import { NgZorroAntdModule } from 'ng-zorro-antd';
// ng-zorro-antd
import { AntdModule } from './module/antd/antd.module';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
/** 配置 ng-zorro-antd 国际化 **/
import { NZ_I18N, en_US } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { StepComponent } from './components/step/step.component';
import { WheelComponent } from './pages/wheel/wheel.component';
import { WheelResultComponent } from './pages/wheel-result/wheel-result.component';
import { WheelSettingComponent } from './pages/wheel-setting/wheel-setting.component';


@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    WheelResultComponent,
    WheelSettingComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    /** 导入 ng-zorro-antd 模块 **/
    // NgZorroAntdModule
    AntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
