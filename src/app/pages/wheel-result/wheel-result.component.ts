import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/service/config.service';
import dateformat from 'dateformat'

@Component({
  selector: 'app-wheel-result',
  templateUrl: './wheel-result.component.html',
  styleUrls: ['./wheel-result.component.scss']
})
export class WheelResultComponent implements OnInit {
  // 搜索表单数据
  searchForm = this.fb.group({
    rotaryTableId: [''],
    date: [''],
    type: [''],
    addressStatus: [''],
    username: [''],
    name: [''],
    phone: [''],
    cityName: [''],
    provinceName: ['']
  })
  // 奖品类型数据
  goodsTypeList: any[] = [{
    value: "",
    name: "全部"
  }, {
    value: "CASH",
    name: "现金"
  }, {
    value: "ENTITY",
    name: "实物奖品"
  }, {
    value: "CANDY",
    name: "糖果"
  }]
  // 地址数据
  addressList: any[] = [{
    value: "",
    name: "全部"
  }, {
    value: "HAVE",
    name: "已有地址"
  }, {
    value: "NONE",
    name: "没有地址"
  }]

  // 活动结果表格数据
  lists: any[] = [
    // {
    //   id: 'MW0001',
    //   goods: '商品1',
    //   imageUrl: 'assets/1.png',
    //   type: '1',
    //   name: 'xxxx品牌笔记本',
    //   goodsPrizeRate: "100;200",
    //   goodsNum: 50,
    //   goodsTotal: 5000
    // }
  ];
  total: number = 1; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  rotaryTableId: string = ""; // 当前选中的活动id
  selectIndex: number = 0; // 当前选中的活动索引
  selectRotary: any = {}; // 当前选中的活动数据
  previewVisible: boolean = false // 预览的图片弹框
  goodsTypeData: object = {
    "CASH": "现金",
    "ENTITY": "实物奖品",
    "CANDY": "糖果"
  }
  // entityImageUrls: any[] = [] // 某个活动id的奖品图片

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);

      // 若路由存在rotaryTableId，则说明需要筛选rotaryTableId
      if(data.rotaryTableId) {
        // 获取大转盘抽奖结果
        this.searchForm.patchValue({
          rotaryTableId: data.rotaryTableId
        })
        this.getLists()
      }
    })


  }

  // 查询
  submitSearch() {
    // console.log(this.searchForm.value);

    // 获取大转盘抽奖结果
    this.getLists()
  }

  // 处理请求数据
  setParams() {
    const { date } = this.searchForm.value;

    let params = {
      page: this.pageIndex,
      // beginDate: '',
      // endDate: '',
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

  // 大转盘抽奖结果导出excel
  exportFn() {
    let params = this.setParams();

    let url = '/api/setting/v1/rotary/table/user/lottery/export';
    this.configService.request(url, 'GET', params).subscribe((res: any) => {
      console.log('大转盘抽奖结果导出excel', res);

      // this.lists = res.data;
    })
  }

  // 获取大转盘抽奖结果
  getLists() {
    this.loading = true;
    let params = this.setParams();

    let url = '/api/setting/v1/rotary/table/user/lottery';
    this.configService.request(url, 'GET', params).subscribe((res: any) => {
      console.log('获取大转盘抽奖结果', res);

      this.lists = res.data;
      this.total = res.pagination.total_page;
      this.loading = false;
    })
  }

  // 点击奖品图片，显示奖励信息
  watchInfo(index, rotaryTableId) {
    this.selectIndex = index;
    this.rotaryTableId = rotaryTableId;
    this.selectRotary = this.lists[index];

    this.previewVisible = true;
  }

  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;

    // 获取大转盘抽奖结果
    this.getLists()
  }

}
