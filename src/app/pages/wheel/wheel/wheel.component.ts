import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WheelService } from 'src/app/service/wheel.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  searchVal: string = ""; // 搜索关键词，活动id或活动名称
  total: number = 0; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  rotaryTableId: string = ""; // 当前选中的活动
  operationType: number = 1; // 操作类型，1：开启，2：停用，3：删除，4：已关联内容，无法删除
  // operationTypeText: object = {
  //   1: "开启",
  //   2: "停用",
  //   3: "删除"
  // }
  isAllStop: boolean = false; // 是否全部转盘活动都停止

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
    private wheelService: WheelService
  ) { }

  ngOnInit() {
    // get the rotary table page（获取大转盘列表）
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

  // get the rotary table page（获取大转盘列表）
  getLists() {
    this.loading = true;
    let params = {
      page: this.pageIndex,
      searchVal: this.searchVal
    }

    this.wheelService.getRotaryTable(params).subscribe(res => {
      console.log('get the rotary table page（获取大转盘列表）', res);

      this.isAllStop = res.data.data.every(item => {
        return item.status === 'DISABLED'
      });

      this.lists = res.data.data;
      this.total = res.data.total_counts;
      this.loading = false;
    })
  }

  // 改变页
  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // get the rotary table page（获取大转盘列表）
    this.getLists()
  }

  // 搜索活动
  searchFn() {
    // get the rotary table page（获取大转盘列表）
    this.getLists()
  }

  // 添加活动
  createFn() {
    this.router.navigate(["/wheel/wheel-setting"])
  }

  // 开启活动
  startFn(rotaryTableId) {
    console.log('开启活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 1;
    this.modalContent = "Are you sure to start？";
    this.isVisible = true;
  }

  // 停止活动
  stopFn(rotaryTableId) {
    console.log('停止活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 2;
    this.modalContent = "Are you sure to close this activity？";
    this.isVisible = true;
  }

  // 编辑活动
  editFn(rotaryTableId) {
    console.log('编辑活动', rotaryTableId);

    this.router.navigate(["/wheel/wheel-setting"], { queryParams: { rotaryTableId } })
  }

  // 抽奖结果
  resultFn(rotaryTableId) {
    console.log('抽奖结果', rotaryTableId);

    this.router.navigate(['/wheel/wheel-result'], { queryParams: { rotaryTableId } })
  }

  // 删除活动
  deleteFn(rotaryTableId) {
    console.log('删除活动', rotaryTableId);

    this.rotaryTableId = rotaryTableId;
    this.operationType = 3;
    this.modalContent = "Are you sure to delete？";
    this.isVisible = true;

    // if (true) {
    //   this.operationType = 4;
    //   this.modalContent = "已关联内容，无法删除";
    // }
  }

  // 模态框点击确定
  confirmModal() {
    if (this.operationType === 1 || this.operationType === 2) {
      // 更改活动状态
      this.alterStatus();
    } else if (this.operationType === 3) {
      // delete the rotary table（删除活动）
      this.deleteRotary();
    } else {
      this.isVisible = false;
    }
  }

  // update the rotary table status info（更改活动状态）
  alterStatus() {
    let params = {
      rotaryTableId: this.rotaryTableId,
      status: this.operationType === 1 ? 'ENABLED' : 'DISABLED'
    }

    this.wheelService.tableStatus(params).subscribe(res => {
      console.log('update the rotary table status info（更改活动状态）', res);

      // get the rotary table page（获取大转盘列表）
      this.getLists()

      this.isVisible = false;
    })
  }

  // delete the rotary table（删除活动）
  deleteRotary() {
    this.wheelService.deleteRotary(this.rotaryTableId).subscribe((res: any) => {
      console.log('delete the rotary table（删除活动）', res);

      // get the rotary table page（获取大转盘列表）
      this.getLists()

      this.isVisible = false;
    })
  }

}
