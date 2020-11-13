import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent implements OnInit {
  search: string = ""; // 搜索关键词
  pageIndex: number = 1; // 当前页码
  loading: boolean = true; // 加载中

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

  constructor() { }

  ngOnInit() {
    setTimeout(() => { 
      this.loading = false;
    }, 1000)
  }

  // 搜索活动
  searchFn() { 
    console.log(this.search);
  }

}
