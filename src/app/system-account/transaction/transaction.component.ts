import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import dateformat from 'dateformat';
import { SystemAccountService } from 'src/app/service/system-account.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  // 搜索表单数据
  searchForm = this.fb.group({
    id: [''],
    referenceNo: [''],
    accountName: [''],
    transactionType: [''],
    subTransactionType: [''],
    date: ['']
  })
  // accountName
  accountNameList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "FP_WALLET",
    name: "FP Wallet"
  }]
  accountNameData: any = {}
  // transactionType
  transactionTypeList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "TOPUP",
    name: "Topup"
  }, {
    value: "INCOME",
    name: "Income"
  }, {
    value: "SPENDING",
    name: "Outlay"
  }, {
    value: "REFUND",
    name: "Refund"
  }]
  transactionTypeData: any = {}
  // subTransactionType
  subTransactionTypeList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "TOPUP",
    name: "Topup"
  }, {
    value: "SELL_SPINNING_CHANCES",
    name: "Sell Spinning Chances"
  }, {
    value: "MONEY_REWARD",
    name: "Money Reward"
  }, {
    value: "SELLING_RAFFLE_TICKET",
    name: "Sell Raffle Ticket"
  }, {
    value: "REDEEM_CASH_FOR_CANDY",
    name: "Redeem Cash for Candy"
  }, {
    value: "SELL_CANDY",
    name: "Sell Candy"
  }, {
    value: "OUTGOING_REFUND",
    name: "Outgoing Refund"
  }, {
    value: "INCOMING_REFUND",
    name: "Incoming Refund"
  }]
  subTransactionTypeData: any = {}

  // 活动结果表格数据
  lists: any[] = [];
  total: number = 0; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private systemAccountService: SystemAccountService
  ) { }

  ngOnInit() {
    // accountName
    for (let item of this.accountNameList) {
      this.accountNameData[item.value] = item.name
    }

    // transactionType
    for (let item of this.transactionTypeList) {
      this.transactionTypeData[item.value] = item.name
    }

    // subTransactionType
    for (let item of this.subTransactionTypeList) {
      this.subTransactionTypeData[item.value] = item.name
    }

    // get the system account transaction record page（获取系统账户交易记录）
    this.getLists()
  }

  // 查询
  submitSearch() {
    console.log(this.searchForm.value);

    // get the system account transaction record page（获取系统账户交易记录）
    this.getLists()
  }

  // 重置查询数据
  resetForm(e: MouseEvent): void {
    e.preventDefault();

    this.searchForm.patchValue({
      id: '',
      referenceNo: '',
      accountName: '',
      transactionType: '',
      subTransactionType: '',
      date: ''
    })

    // get the system account transaction record page（获取系统账户交易记录）
    this.getLists()

    // this.searchForm.reset();
    // for(const key in this.searchForm.controls) {
    //   this.searchForm.controls[key].markAsPristine();
    //   this.searchForm.controls[key].updateValueAndValidity();
    // }
    // console.log(this.searchForm.value)
  }

  // 处理请求数据
  setParams() {
    const { date } = this.searchForm.value;

    let params = {
      page: this.pageIndex,
      ...this.searchForm.value,
    }

    if (date.length > 0) {
      params.startTime = dateformat(date[0], 'yyyy-mm-dd hh:MM:ss')
      params.endTime = dateformat(date[1], 'yyyy-mm-dd hh:MM:ss')
    }

    delete params.date;

    console.log(params);
    return params;
  }

  // get the system account transaction record page（获取系统账户交易记录）
  getLists() {
    this.loading = true;
    let params = this.setParams();

    this.systemAccountService.systemAccountTransaction(params).subscribe((res: any) => {
      console.log('get the system account transaction record page（获取系统账户交易记录）', res);

      this.lists = res.data;
      this.total = res.total_counts;
      this.loading = false;
    })
  }

  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // get the system account transaction record page（获取系统账户交易记录）
    this.getLists()
  }
}
