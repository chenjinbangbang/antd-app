import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import dateformat from 'dateformat'
import { WheelService } from 'src/app/service/wheel.service';

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
    status: [''],
    // addressStatus: [''],
    username: [''],
    name: [''],
    phone: [''],
    cityName: [''],
    provinceName: ['']
  })
  // 奖品类型数据
  goodsTypeList: any[] = [{
    value: "",
    name: "All"
  }, {
    value: "CASH",
    name: "Cash"
  }, {
    value: "ENTITY",
    name: "Entity"
  }, {
    value: "CANDY",
    name: "Candy"
  }, {
    value: "NOTHING",
    name: "Nothing"
  }]
  //  RECEIVE, FINISH, AWAIT, GIVE_UP, COLLECT, DELIVERED
  statusList: any[] = [{
    value: "",
    name: "All"
  },{
    value: "RECEIVE",
    name: "RECEIVE"
  },{
    value: "FINISH",
    name: "FINISH"
  },{
    value: "AWAIT",
    name: "AWAIT"
  },{
    value: "GIVE_UP",
    name: "GIVE_UP"
  },{
    value: "COLLECT",
    name: "COLLECT"
  },{
    value: "DELIVERED",
    name: "DELIVERED"
  }]
  // 地址数据
  // addressList: any[] = [{
  //   value: "",
  //   name: "全部"
  // }, {
  //   value: "HAVE",
  //   name: "已有地址"
  // }, {
  //   value: "NONE",
  //   name: "没有地址"
  // }]

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
  total: number = 0; // 总页数
  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  rotaryTableId: string = ""; // 当前选中的活动id
  selectIndex: number = 0; // 当前选中的活动索引
  selectRotary: any = {}; // 当前选中的活动数据
  previewVisible: boolean = false; // 预览的图片弹框
  goodsTypeData: object = {
    "CASH": "Cash",
    "ENTITY": "Entity",
    "CANDY": "Candy",
    "NOTHING": "Nothing"
  };
  // entityImageUrls: any[] = [] // 某个活动id的奖品图片
  selectId: string = ''; // 选中的活动结果id
  deliveredVisible: boolean = false; // 确认收货弹框
  deliveredForm = this.fb.group({
    remark: ['', [Validators.required]]
  })

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private wheelService: WheelService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      console.log(data);

      // 若路由存在rotaryTableId，则说明需要筛选rotaryTableId
      if(data.rotaryTableId) {
        this.searchForm.patchValue({
          rotaryTableId: data.rotaryTableId
        })
      }

      // get the rotary table user lottery page（获取大转盘抽奖结果）
      this.getLists()
    })
  }

  // 查询
  submitSearch() {
    // console.log(this.searchForm.value);

    // get the rotary table user lottery page（获取大转盘抽奖结果）
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

  // export the rotary table user lottery list to excel（大转盘抽奖结果导出excel）
  exportFn() {
    let params = this.setParams();

    this.wheelService.lotteryExport(params);
  }

  // get the rotary table user lottery page（获取大转盘抽奖结果）
  getLists() {
    this.loading = true;
    let params = this.setParams();

    this.wheelService.getLottery(params).subscribe((res: any) => {
      console.log('get the rotary table user lottery page（获取大转盘抽奖结果）', res);

      this.lists = res.data;
      this.total = res.total_counts;
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

    // get the rotary table user lottery page（获取大转盘抽奖结果）
    this.getLists()
  }

  // 显示确认收货弹框
  showconfirmDelivered(id){
    this.selectId = id;
    this.deliveredVisible = true;

    this.deliveredForm.reset();
  }

  // 取消奖品设置表单
  deliveredCancel = (e: MouseEvent) => {
    e.preventDefault();

    this.deliveredVisible = false;
  }

  // 点击确认收货
  confirmDelivered() {

    if(this.deliveredForm.valid) {
      let params = {
        id: this.selectId,
        remark: this.deliveredForm.value.remark
      };

      // Deliver the entity prizes（确认收货）
      let url = '/api/setting/v1/rotary/table/user/lottery/delivery';
      this.wheelService.lotteryDelivery(params).subscribe((res: any) => {
        console.log('Deliver the entity prizes（确认收货）', res);

        // get the rotary table user lottery page（获取大转盘抽奖结果）
        this.getLists()
      })

    } else {
      for (const i in this.deliveredForm.controls) {
        this.deliveredForm.controls[i].markAsDirty();
        this.deliveredForm.controls[i].updateValueAndValidity();
      }
    }

  }

}
