import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// 路由
import { AppRoutingModule } from './module/app-routing/app-routing.module'; // CLI imports AppRoutingModule

// import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AntdModule } from './module/antd/antd.module';
import { WheelComponent } from './pages/wheel/wheel.component';
import { WheelResultComponent } from './pages/wheel-result/wheel-result.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    WheelResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,

    /** 导入 ng-zorro-antd 模块 **/
    // NgZorroAntdModule
    AntdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
