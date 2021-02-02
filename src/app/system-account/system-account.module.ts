import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntdModule } from 'src/app/module/antd/antd.module';
import { ComponentModule } from 'src/app/module/component/component.module';

import { ApiService } from 'src/app/service/api.service';
import { CommonService } from 'src/app/service/common.service';
import { SystemAccountService } from 'src/app/service/system-account.service';

import { AccountInfoComponent } from './account-info/account-info.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TopupRecordComponent } from './topup-record/topup-record.component';
import { TopupRecordDetailComponent } from './topup-record-detail/topup-record-detail.component';

import { SplitPipe } from 'src/app/pipe/split.pipe';

const routes: Routes = [
  { path: '', component: AccountInfoComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'topup-record', component: TopupRecordComponent },
  { path: 'topup-record-detail', component: TopupRecordDetailComponent },
]

@NgModule({
  declarations: [
    AccountInfoComponent, 
    TransactionComponent,
    TopupRecordComponent,
    TopupRecordDetailComponent,

    SplitPipe
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
    SystemAccountService
  ]
})
export class SystemAccountModule { }
