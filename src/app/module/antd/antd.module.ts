import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NzButtonModule,
  NzInputModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzTableModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzButtonModule,
    NzInputModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzTableModule
  ]
})
export class AntdModule { }
