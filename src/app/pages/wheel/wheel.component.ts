import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  search: string = ""; // 搜索关键词
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  activityId: string = ""; // 当前选中的活动
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
    {
      id: 'MW0001',
      activityName: '国庆大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW0002',
      activityName: '七夕大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '停止'
    },
    {
      id: 'MW0003',
      activityName: '中秋大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW0004',
      activityName: '国庆大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW0005',
      activityName: '七夕大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '停止'
    },
    {
      id: 'MW0006',
      activityName: '中秋大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW0007',
      activityName: '国庆大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW0008',
      activityName: '七夕大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '停止'
    },
    {
      id: 'MW0009',
      activityName: '中秋大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW00010',
      activityName: '国庆大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    },
    {
      id: 'MW00011',
      activityName: '七夕大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '停止'
    },
    {
      id: 'MW00012',
      activityName: '中秋大转盘',
      activityTime: '2020-10-01至2020-10-07每天9:00:00至10:00:00',
      activityTimeHot: '2020-9-25至2020-10-07结果时间10月7日10:00:00',
      status: '开启'
    }
  ];

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 1000)

    // this.modal.create({
    //   nzIconType: "exclamation-circle",
    //   nzTitle: "删除",
    //   nzContent: `<div>是否删除吗？</div>`,
    //   nzOkText: null,
    //   nzCancelText: null
    // })
  }

  // 改变页
  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;
  }

  // 搜索活动
  searchFn() {
    console.log(this.search);
  }

  // 添加活动
  createFn() {
    this.router.navigate(["/wheel-setting", { id: '123' }])
  }

  // 开启活动
  startFn(id) {
    console.log('开启活动', id);

    this.activityId = id;
    this.operationType = 1;
    this.modalContent = "确定开启吗？";
    this.isVisible = true;
  }

  // 停止活动
  stopFn(id) {
    console.log('停止活动', id);

    this.activityId = id;
    this.operationType = 2;
    this.modalContent = "确定停用吗？";
    this.isVisible = true;
  }

  // 编辑活动
  editFn(id) {
    console.log('编辑活动', id);
  }

  // 抽奖结果
  resultFn(id) {
    console.log('抽奖结果', id);
  }

  // 删除活动
  deleteFn(id) {
    console.log('删除活动', id);

    this.activityId = id;
    this.operationType = 3;
    this.modalContent = "确定删除吗？";
    this.isVisible = true;

    if (true) {
      this.operationType = 4;
      this.modalContent = "已关联内容，无法删除";
    }
  }

  // 点击确定
  submit() {
    this.isVisible = false;

    if (this.operationType === 4) {
      return;
    }

    this.message.success(`该活动已${this.operationTypeText[this.operationType]}`);
    // console.log(`${this.operationTypeText[this.operationType]}成功！`);
  }

}
