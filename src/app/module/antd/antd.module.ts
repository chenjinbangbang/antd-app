import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NzButtonModule,
  NzGridModule,
  NzIconModule,
  NzInputModule,
  NzCheckboxModule,
  NzSelectModule,
  NzInputNumberModule,
  NzUploadModule,
  NzMenuModule,
  NzBreadCrumbModule,
  NzTableModule,
  NzModalModule,
  NzMessageModule,
  NzFormModule,
  NzDatePickerModule,
  NzTimePickerModule
} from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzCheckboxModule,
    NzSelectModule,
    NzInputNumberModule,
    NzUploadModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzDatePickerModule,
    NzTimePickerModule
  ]
})
export class AntdModule { }
