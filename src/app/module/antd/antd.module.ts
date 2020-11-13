import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule, NzInputModule, NzMenuModule, NzBreadCrumbModule  } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NzButtonModule,
    NzInputModule,
    NzMenuModule,
    NzBreadCrumbModule
  ]
})
export class AntdModule { }
