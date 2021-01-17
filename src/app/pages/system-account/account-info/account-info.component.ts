import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { SystemAccountService } from 'src/app/service/system-account.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  isVisible: boolean = false; // 系统账户充值弹框
  detail: any = {}; // 系统账户统计信息

  // 奖品设置表单数据
  topupForm = this.fb.group({
    accountName: ['FP_WALLET'],
    amount: ['', [Validators.required]],
    bankDepositReceipt: ['', [Validators.maxLength(60)]],
    uploadReceiptUrl: [''],
    remark: ['', [Validators.maxLength(120)]]
  })
  imageUrlList: any[] = []; // deposit slip image

  // accountName
  accountNameData: any = {
    FP_WALLET: "FP Wallet"
  }

  constructor(
    private systemAccountService: SystemAccountService,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // get the system account transaction statistics info（获取系统账户交易统计信息）
    this.getDetail();
  }

  // 上传图片
  changeFile(fileList, key) {
    console.log('changeFIle', fileList);
    this[key] = fileList;
  }

  // get the system account transaction statistics info（获取系统账户交易统计信息）
  getDetail() {
    this.systemAccountService.systemAccountTransactionStat().subscribe((res: any) => {
      console.log('get the system account transaction statistics info（获取系统账户交易统计信息）', res);

      this.detail = res;
    })
  }

  // 前往transcation页面
  toTransaction() {
    this.router.navigate(['/system-account/transaction']);
  }

  // 点击系统账户充值
  topupFn(e: MouseEvent) {
    e.preventDefault();

    this.topupForm.reset();

    this.imageUrlList = [];
    this.topupForm.patchValue({
      accountName: 'FP_WALLET',
      amount: '',
      bankDepositReceipt: '',
      uploadReceiptUrl: '',
      remark: ''
    })

    this.isVisible = true;
  }

  // 系统账户充值
  submitTopupForm() {
    console.log('系统账户充值')
    console.log(this.topupForm.value);

    this.topupForm.patchValue({
      uploadReceiptUrl: this.imageUrlList.length > 0 ? this.imageUrlList[0] : '',
    })

    console.log('校验是否通过', this.topupForm.valid);

    // 校验是否通过
    if (this.topupForm.valid) {
      // let params = this.topupForm.value

      // console.log(params);

      this.isVisible = false;

      // save the system account topup record（保存系统账户充值记录）
      this.systemAccountTopup()
    } else {
      for (const i in this.topupForm.controls) {
        this.topupForm.controls[i].markAsDirty();
        this.topupForm.controls[i].updateValueAndValidity();
      }

      // if (!this.topupForm.value.uploadReceiptUrl) {
      //   return this.message.error('Please upload deposit slip image');
      // }
    }
  }

  // save the system account topup record（保存系统账户充值记录）
  systemAccountTopup() {
    this.systemAccountService.systemAccountTopup(this.topupForm.value).subscribe((res: any) => {
      console.log('save the system account topup record（保存系统账户充值记录）', res);

      this.message.success('The topup is submitted successfully');

      // get the system account transaction statistics info（获取系统账户交易统计信息）
      this.getDetail();
    })
  }

  // 取消系统账户充值表单
  topupCancel = (e: MouseEvent) => {
    e.preventDefault();

    this.isVisible = false;
  }

}
