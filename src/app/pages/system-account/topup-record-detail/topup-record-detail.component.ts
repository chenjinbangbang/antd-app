import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemAccountService } from 'src/app/service/system-account.service';

@Component({
  selector: 'app-topup-record-detail',
  templateUrl: './topup-record-detail.component.html',
  styleUrls: ['./topup-record-detail.component.scss']
})
export class TopupRecordDetailComponent implements OnInit {
  id: string = ""; // 系统账户充值信息id
  detail: any = {}; // 系统账户充值详细信息

  // status
  statusColor: object = {
    'SUCCESS': 'success',
    'PENDING': 'orange',
    'FAILED': 'danger'
  }

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

  constructor(
    private systemAccountService: SystemAccountService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    // get the system account transaction statistics info（获取系统账户交易统计信息）
    // this.getDetail();

    // accountName
    for (let item of this.accountNameList) {
      this.accountNameData[item.value] = item.name
    }
    // status
    for (let item of this.statusList) {
      this.statusData[item.value] = item.name
    }

    this.route.queryParams.subscribe(data => {
      console.log('queryParams', data);

      this.id = data.id;

      // get the system account topup details by id（通过ID获取系统账户充值详细信息）
      this.getDetail()
    })
  }

  // 上传图片
  changeFile(fileList, key) {
    console.log('changeFIle', fileList);
    this[key] = fileList;
  }

  // get the system account topup details by id（通过ID获取系统账户充值详细信息）
  getDetail() {
    this.systemAccountService.systemAccountTopupDetail(this.id).subscribe((res: any) => {
      console.log('get the system account topup details by id（通过ID获取系统账户充值详细信息）', res);

      this.detail = res.data;
    })
  }

  // 前往transcation页面
  toTransaction() {
    this.router.navigate(['/system-account/transaction']);
  }
}
