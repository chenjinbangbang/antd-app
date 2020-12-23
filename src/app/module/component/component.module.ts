import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AntdModule } from '../antd/antd.module';

import { UploadComponent } from 'src/app/components/upload/upload.component';


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    AntdModule
  ],
  exports: [
    UploadComponent
  ]
})
export class ComponentModule { }
