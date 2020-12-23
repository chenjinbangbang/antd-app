import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import dateformat from 'dateformat'
import { WheelService } from 'src/app/service/wheel.service';

@Component({
  selector: 'app-candy-list',
  templateUrl: './candy-list.component.html',
  styleUrls: ['./candy-list.component.scss']
})
export class CandyListComponent implements OnInit {

  // 搜索表单数据
  searchForm = this.fb.group({
    userId: [''],
    username: [''],
    type: [''],
    relationId: [''],
    date: [''],
  })
  // 糖果事件类型
  typeList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "ROTARY_TABLE_PRIZE",
    name: "ROTARY_TABLE_PRIZE"
  }, {
    value: "ROTARY_TABLE_LOTTERY_EXCHANGE",
    name: "ROTARY_TABLE_LOTTERY_EXCHANGE"
  }]

  // 活动结果表格数据
  lists: any[] = [];
  total: number = 0; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private wheelService: WheelService
  ) { }

  ngOnInit() {
    // get the candy record page（获取糖果明细列表）
    this.getLists();
  }

  // 查询
  submitSearch() {
    console.log(this.searchForm.value);

    // get the candy record page（获取糖果明细列表）
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
      params.beginDate = dateformat(date[0], 'yyyy-mm-dd hh:MM:ss')
      params.endDate = dateformat(date[1], 'yyyy-mm-dd hh:MM:ss')
    }

    delete params.date;

    console.log(params);
    return params;
  }

  // get the candy record page（获取糖果明细列表）
  getLists() {
    this.loading = true;
    let params = this.setParams();

    this.wheelService.candyRecord(params).subscribe((res: any) => {
      console.log('get the candy record page（获取糖果明细列表）', res);

      this.lists = res.data.data;
      this.total = res.data.total_counts;
      this.loading = false;
    })
  }

  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // get the candy record page（获取糖果明细列表）
    this.getLists()
  }

}
