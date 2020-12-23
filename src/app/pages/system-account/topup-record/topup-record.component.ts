import { Component, OnInit, Pipe } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import dateformat from 'dateformat';
import { NzMessageService } from 'ng-zorro-antd';
import { SystemAccountService } from 'src/app/service/system-account.service';

@Component({
  selector: 'app-topup-record',
  templateUrl: './topup-record.component.html',
  styleUrls: ['./topup-record.component.scss']
})
export class TopupRecordComponent implements OnInit {
  approveIsVisible: boolean = false; // Approve确认弹框
  rejectIsVisible: boolean = false; // Reject确认弹框
  topupInfo: any = {}; // 当前选中的topup信息
  rejectForm = this.fb.group({
    remark: ['']
  })
  statusColor: object = {
    'SUCCESS': 'success',
    'PENDING': 'orange',
    'FAILED': 'danger'
  }

  // 搜索表单数据
  searchForm = this.fb.group({
    id: [''],
    accountName: [''],
    status: [''],
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

  // status
  statusList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "SUCCESS",
    name: "Success"
  }, {
    value: "PENDING",
    name: "Pending for approval"
  }, {
    value: "FAILED",
    name: "Failed"
  }]
  statusData: any = {}

  // remark status
  remarkData: any = {
    SUBMIT: 'Submit topup application',
    REJECTED: 'Rejected topup application',
    APPROVED: 'Approved topup application'
  }

  // 活动结果表格数据
  lists: any[] = [];
  total: number = 0; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private systemAccountService: SystemAccountService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // accountName
    for (let item of this.accountNameList) {
      this.accountNameData[item.value] = item.name
    }
    // status
    for (let item of this.statusList) {
      this.statusData[item.value] = item.name
    }

    // get the system account topup record page（获取系统账户充值记录）
    this.getLists()
  }

  // 查询
  submitSearch() {
    console.log(this.searchForm.value);

    // get the system account topup record page（获取系统账户充值记录）
    this.getLists()
  }

  // 重置查询数据
  resetForm(e: MouseEvent): void {
    e.preventDefault();

    this.searchForm.patchValue({
      id: '',
      accountName: '',
      status: '',
      date: ''
    })

    // get the system account topup record page（获取系统账户充值记录）
    this.getLists()
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

  // get the system account topup record page（获取系统账户充值记录）
  getLists() {
    this.loading = true;
    let params = this.setParams();

    this.systemAccountService.getSystemAccountTopup(params).subscribe((res: any) => {
      console.log('get the system account topup record page（获取系统账户充值记录）', res);

      this.lists = res.data.data;
      this.total = res.data.total_counts;
      this.loading = false;
    })
  }

  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // get the system account topup record page（获取系统账户充值记录）
    this.getLists()
  }

  // approve，reject
  operationFn(i, type) {
    this.topupInfo = JSON.parse(JSON.stringify(this.lists[i]));
    if (type === 1) {
      this.approveIsVisible = true;
    } else if (type === 2) {
      this.rejectIsVisible = true;
    }

  }

  // approve提交
  submitApproveForm() {
    // audit the system account topup（审核系统账户充值）
    this.systemAccountTopupAudit('APPROVED');
  }

  // 取消Approve确认弹框表单
  approveCancel = (e: MouseEvent) => {
    e.preventDefault();

    this.approveIsVisible = false;
  }

  // reject提交
  submitRejectForm() {
    // audit the system account topup（审核系统账户充值）
    this.systemAccountTopupAudit('REJECTED');
  }

  // 取消Reject确认弹框表单
  rejectCancel = (e: MouseEvent) => {
    e.preventDefault();

    this.rejectIsVisible = false;
  }

  // audit the system account topup（审核系统账户充值）
  systemAccountTopupAudit(status) {
    let params: any = {
      id: this.topupInfo.id,
      status
    }

    if (status === 'REJECTED') {
      params.remark = this.rejectForm.value.remark
    }

    this.systemAccountService.systemAccountTopupAudit(params).subscribe((res: any) => {
      this.message.success(status === 'APPROVED' ? 'Successful topup!' : 'Reject Confirm!');

      if (status === 'APPROVED') {
        this.approveIsVisible = false;
      } else if (status === 'REJECTED') {
        this.rejectIsVisible = false;
      }

      // get the system account topup record page（获取系统账户充值记录）
      this.getLists()
    })
  }
}
