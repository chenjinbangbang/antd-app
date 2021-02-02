import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 路由拦截器
import { NoopInterceptor } from './http-interceptors/noop-interceptor';

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
// import { StepComponent } from './components/step/step.component';
import { HomeComponent } from './home/home.component';

import { IndexComponent } from './wheel/index/index.component';
import { AccountIndexComponent } from './system-account/account-index/account-index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    IndexComponent,
    AccountIndexComponent,
    // WheelComponent,
    // WheelResultComponent,
    // WheelSettingComponent,
    // StepComponent,

    // ActivityComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    /** 导入 ng-zorro-antd 模块 **/
    // NgZorroAntdModule
    AntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
