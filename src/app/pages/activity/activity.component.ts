import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from 'src/app/service/config.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  isVisible: boolean = false; // 模态框
  operationType: number = 1; // 操作类型，1：添加，2：编辑，3：查看，4：删除
  id: string = ''; // 选中的id

  // 活动结果表格数据
  lists: any[] = [
    {
      id: 'MW0001',
      imageUrl: 'assets/1.png',
      name: 'xxxx'
    },
    {
      id: 'MW0002',
      imageUrl: 'assets/1.png',
      name: 'xxxx'
    }
  ];
  total: number = 1; // 总页数
  pageSize: number = 10; // 一页有多少条数据
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  mapOfCheckedId: { [key: string]: boolean } = {}; // 选中的值
  selectArr: any = []; // 选中的值
  

  // 奖品设置表单数据
  form = this.fb.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(50)]],
  })
  formVisible: boolean = false; // 添加，编辑，查看活动模态框

  constructor(private fb: FormBuilder,private configService: ConfigService) { }

  ngOnInit() {
  }

  // 选中列表
  refreshStatus() {
    // console.log(this.mapOfCheckedId);
    // console.log(Object.keys(this.mapOfCheckedId));
    this.selectArr = Object.keys(this.mapOfCheckedId);
  }

  // 页数改变时的回调函数	
  pageSizeChange(pageSize: number) {
    console.log("一页有多少条数据", pageSize);
    this.pageSize = pageSize;
  }

  // 当前页码改变时的回调函数
  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;
  }


  // 添加任务
  createFn() {
    this.operationType = 1;
  }

  // 查看任务
  resultFn(id) {
    this.id = id;
  }

  // 下架，上架任务
  alterStatus(id, status) {
    this.id = id;
  }

  // 删除任务
  deleteFn(id) {
    this.id = id;
    this.operationType = 4;
    this.isVisible = true;
  }

  // 模态框点击确定
  confirmModal() {
    console.log('删除任务');
  }

  // 提交表单
  submitForm(){

  }

}
