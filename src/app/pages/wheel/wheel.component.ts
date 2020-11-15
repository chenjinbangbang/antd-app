import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  rotationTableId: string = ""; // 搜索关键词，活动id
  total: number = 22; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  rotaryTableId: string = ""; // 当前选中的活动
  operationType: number = 1; // 操作类型，1：开启，2：停用，3：删除，4：已关联内容，无法删除
  operationTypeText: object = {
    1: "开启",
    2: "停用",
    3: "删除"
  }

  isVisible: boolean = false; // 模态框
  modalContent: string = ""; // 模态框标题

  // 表格数据
  lists: any[] = [
    // {
    //   rotaryTableId: 'MW0001',
    //   title: '国庆大转盘',
    //   prepareStartDate: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
    //   activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
    //   status: '开启'
    // }
  ];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    // 获取大转盘列表
    this.getLists()

    // this.modal.create({
    //   nzIconType: "exclamation-circle",
    //   nzTitle: "删除",
    //   nzContent: `<div>是否删除吗？</div>`,
    //   nzOkText: null,
    //   nzCancelText: null
    // })

    // 使用rxjs
    // const url = 'http://www.mjpai.cn/prize/list';
    // this.http.get(url, { params: { id: 123 }  }).subscribe((data) => {
    //   // this.data = data;
    //   console.log(data)
    // }, (err) => {
    //   console.log(err);
    // });

    // this.configService.request(url, 'GET', { id: 1 }).subscribe(res => {
    //   console.log(res)
    // })

    // const location = new Observable((observer) => {
    //   setTimeout(() => {
    //     // observer.next('请求成功');
    //     observer.error('请求失败');
    //   }, 2000)
    // })

    // const result = location.subscribe({
    //   next(position) {
    //     console.log(position);
    //   },
    //   error(msg) {
    //     console.log(msg);
    //   }
    // })
    // location.subscribe(res => {
    //   console.log(res)
    // }, err => {
    //   console.log(err)
    // })
  }

  // 获取大转盘列表
  getLists() {
    this.loading = true;
    let params = {
      page: this.pageIndex,
      rotationTableId: this.rotationTableId
    }

    let url = '/api/setting/v1/rotary/table';
    this.configService.request(url, 'GET', params).subscribe((res: any) => {
      console.log('获取大转盘列表', res);

      this.lists = res.data;
      this.total = res.pagination.total_page;
      this.loading = false;
    })
  }

  // 改变页
  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // 获取大转盘列表
    this.getLists()
  }

  // 搜索活动
  searchFn() {
    // console.log(this.rotationTableId);

    // 获取大转盘列表
    this.getLists()
  }

  // 添加活动
  createFn() {
    this.router.navigate(["/wheel-setting"])
  }

  // 开启活动
  startFn(rotaryTableId) {
    console.log('开启活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 1;
    this.modalContent = "确定开启吗？";
    this.isVisible = true;
  }

  // 停止活动
  stopFn(rotaryTableId) {
    console.log('停止活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 2;
    this.modalContent = "确定停用吗？";
    this.isVisible = true;
  }

  // 编辑活动
  editFn(rotaryTableId) {
    console.log('编辑活动', rotaryTableId);

    this.router.navigate(["/wheel-setting", { rotaryTableId }])
  }

  // 抽奖结果
  resultFn(rotaryTableId) {
    console.log('抽奖结果', rotaryTableId);

    this.router.navigate(['/wheel-result', { rotaryTableId }])
  }

  // 删除活动
  deleteFn(rotaryTableId) {
    console.log('删除活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 3;
    this.modalContent = "确定删除吗？";
    this.isVisible = true;

    // if (true) {
    //   this.operationType = 4;
    //   this.modalContent = "已关联内容，无法删除";
    // }
  }

  // 模态框点击确定
  submit() {
    if (this.operationType === 4) {
      this.isVisible = false;
      return;
    }

    // 更改活动状态
    this.alterStatus();
  }

  // 更改活动状态
  alterStatus() {
    let params = {
      rotaryTableId: this.rotaryTableId,
      status: this.operationType === 1 ? 'ENABLED' : 'DISABLED'
    }

    let url = '/api/setting/v1/rotary/table/status';
    this.configService.request(url, 'PUT', params).subscribe((res: any) => {
      console.log('获取大转盘列表', res);

      // 获取大转盘列表
      this.getLists()

      this.isVisible = false;
      this.message.success(`该活动已${this.operationTypeText[this.operationType]}`);
    })
  }

}
