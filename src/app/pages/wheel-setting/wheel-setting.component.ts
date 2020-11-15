import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { ActivatedRoute, CanLoad, CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
// import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import dateformat from 'dateformat';

import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';

// 异步验证器
// class UniqureAlterEgoValidator implements AsyncValidator {
//   validate(
//     ctrl: AbstractControl
//   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(true ? { uniqueAlterEgo: true } : null);
//       }, 2000)
//     })

//   }
// }

@Component({
  selector: 'app-wheel-setting',
  templateUrl: './wheel-setting.component.html',
  styleUrls: ['./wheel-setting.component.scss']
})
export class WheelSettingComponent implements OnInit {
  // name = new FormControl(''); // 使用FormControl的构造函数设置初始值
  // profileForm = new FormGroup({
  //   firstName: new FormControl('',),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   })
  // }, { validators: this.identityRevealedValidator })

  // profileForm1 = this.fb.group({
  //   firstName: ['', Validators.required],
  //   lastName: ['', [Validators.required, Validators.minLength(2), this.forbiddenNameValidator(/bob/i)]],
  //   address: this.fb.group({
  //     street: [''],
  //     city: [''],
  //     state: [''],
  //     zip: ['']
  //   }),
  //   aliases: this.fb.array([
  //     this.fb.control('')
  //   ])
  // })

  // 自定义验证器
  // forbiddenNameValidator(nameRe: RegExp) {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const forbidden = nameRe.test(control.value);
  //     return forbidden ? { 'forbiddenName': { value: control.value } } : null
  //   }
  // }

  // identityRevealedValidator(control: FormGroup): ValidationErrors | null {
  //   const firstName = control.get('firstName');
  //   const lastName = control.get('lastName');

  //   return firstName.value === lastName.value ? { 'identityRevealed': true, forbiddenName: true } : null
  // }

  // userNameAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
  //   setTimeout(() => {
  //     if (control.value === 'name') {
  //       observer.next({ error: true, duplicated: true })
  //     } else {
  //       observer.next(null);
  //     }
  //     observer.complete();
  //   }, 1000);
  // });

  // 异步校验活动ID
  idAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
    setTimeout(() => {
      if (control.value === '100') {
        observer.next({ error: true, duplicated: true })
      } else {
        observer.next(null);
      }
      observer.complete();
    }, 1000);
  });

  // 表单数据
  form = this.fb.group({
    id: ['', [Validators.required], [this.idAsyncValidator]],
    name: ['', [Validators.required, Validators.maxLength(10)]],
    describe: ['', [Validators.required, Validators.maxLength(200)]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    hotStartTime: [null, [Validators.required]],
    hotEndTime: [null, [Validators.required]],
    isCost1: [false],
    cost1: [''],
    isCost2: [false],
    cost2: [''],
    isCost3: [false],
    cost3: [''],
    isCost4: [false],
    cost4: [1],
    citys: this.fb.array([
      this.fb.control('深圳'),
      this.fb.control('广州'),
      this.fb.control('上海'),
      this.fb.control('重庆'),
    ]),
    prizeRate: ['', [Validators.required]],
    rule: ['', [Validators.required, Validators.maxLength(1000)]]
  })
  get citys() {
    return this.form.get('citys') as FormArray;
  }
  fileList = []
  previewImage: string = '' // 预览的图片
  previewVisible: boolean = false // 预览的图片弹框
  originForm: string = '' // 表单字符串，用于判断表单是否修改过

  // 中奖概率校验
  prizeRateValidator(control: FormControl): ValidationErrors | null {
    console.log(control);
    let val = control.value;

    let reg = new RegExp(/[^\d;]/);
    if (reg.test(val)) {
      return { regError: true }
    }

    let arr = val.split(';');
    console.log(arr);
    for (let item of arr) {
      if (!item) {
        return { inputError: true }
      }

      let num = Number(item);
      if (num < 1 || num > 9999999999) {
        return { rangeError: true }
      }
    }

    return null;
  }

  // 奖品设置表单数据
  prizeForm = this.fb.group({
    id: ['', [Validators.required]],
    goodsType: ['1', [Validators.required]],
    goodsName: ['', [Validators.required, Validators.maxLength(30)]],
    goodsCost: ['', [Validators.required]],
    goodsImg: ['', [Validators.required]],
    goodsDescribe: ['', [Validators.required, Validators.maxLength(500)]],
    goodsImgList: this.fb.array([]),
    goodsPrizeRate: ['', [Validators.required, Validators.maxLength(500), this.prizeRateValidator]],
    goodsNum: ['', [Validators.required]],
    goodsTotal: ['', [Validators.required]],
  })
  goodsTypeList: any[] = [{
    value: "1",
    name: "现金"
  }, {
    value: "2",
    name: "实物奖品"
  }, {
    value: "3",
    name: "糖果"
  }]

  // 表格数据
  lists: any[] = [
    {
      id: 'MW0001',
      goods: '商品1',
      goodsImg: 'assets/1.png',
      goodsType: '现金',
      goodsName: 'xxxx品牌笔记本',
      goodsPrizeRate: 100,
      goodsNum: 50,
      goodsTotal: 5000
    },
    {
      id: 'MW0002',
      goods: '商品2',
      goodsImg: 'assets/2.png',
      goodsType: '实体商品',
      goodsName: 'xxxx品牌雨伞',
      goodsPrizeRate: 200,
      goodsNum: 20,
      goodsTotal: 1000
    },
    {
      id: 'MW0003',
      goods: '商品3',
      goodsImg: 'assets/2.png',
      goodsType: '糖果',
      goodsName: '网红笔记本',
      goodsPrizeRate: '糖果不设置',
      goodsNum: '糖果不设置',
      goodsTotal: '糖果不设置',
    },
    {
      id: 'MW0004',
      goods: '商品4',
      goodsImg: 'assets/1.png',
      goodsType: '现金',
      goodsName: 'xxxx品牌笔记本',
      goodsPrizeRate: 100,
      goodsNum: 50,
      goodsTotal: 5000
    },
    {
      id: 'MW0005',
      goods: '商品5',
      goodsImg: 'assets/2.png',
      goodsType: '实体商品',
      goodsName: 'xxxx品牌雨伞',
      goodsPrizeRate: 200,
      goodsNum: 20,
      goodsTotal: 1000
    },
    {
      id: 'MW0006',
      goods: '商品6',
      goodsImg: 'assets/2.png',
      goodsType: '糖果',
      goodsName: '网红笔记本',
      goodsPrizeRate: '糖果不设置',
      goodsNum: '糖果不设置',
      goodsTotal: '糖果不设置',
    },
    {
      id: 'MW0007',
      goods: '商品7',
      goodsImg: 'assets/1.png',
      goodsType: '现金',
      goodsName: 'xxxx品牌笔记本',
      goodsPrizeRate: 100,
      goodsNum: 50,
      goodsTotal: 5000
    },
    {
      id: 'MW0008',
      goods: '商品8',
      goodsImg: 'assets/2.png',
      goodsType: '实体商品',
      goodsName: 'xxxx品牌雨伞',
      goodsPrizeRate: 200,
      goodsNum: 20,
      goodsTotal: 1000
    },
    {
      id: 'MW0009',
      goods: '商品9',
      goodsImg: 'assets/2.png',
      goodsType: '糖果',
      goodsName: '网红笔记本',
      goodsPrizeRate: '糖果不设置',
      goodsNum: '糖果不设置',
      goodsTotal: '糖果不设置',
    },
    {
      id: 'MW00010',
      goods: '商品10',
      goodsImg: 'assets/1.png',
      goodsType: '现金',
      goodsName: 'xxxx品牌笔记本',
      goodsPrizeRate: 100,
      goodsNum: 50,
      goodsTotal: 5000
    },
    {
      id: 'MW00011',
      goods: '商品11',
      goodsImg: 'assets/2.png',
      goodsType: '实体商品',
      goodsName: 'xxxx品牌雨伞',
      goodsPrizeRate: 200,
      goodsNum: 20,
      goodsTotal: 1000
    },
    {
      id: 'MW00012',
      goods: '商品12',
      goodsImg: 'assets/2.png',
      goodsType: '糖果',
      goodsName: '网红笔记本',
      goodsPrizeRate: '糖果不设置',
      goodsNum: '糖果不设置',
      goodsTotal: '糖果不设置',
    },
  ];


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

  isVisible: boolean = true; // 模态框
  modalContent: string = ""; // 模态框标题

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    // route.params.subscribe(data => {
    //   console.log('---', data)
    // })

  }

  ngOnInit() {
    console.log(this.form.value);
    // console.log(this.route)
    // console.log("获取动态路由", this.route.params); // 获取动态路由
    // console.log("获取get传值", this.route.queryParams); // 获取get传值
    // this.route.queryParams.subscribe((data) => {  // 获取get传值
    //   console.log("获取get传值", data);
    // });

    // let id: Observable<string> = this.route.params.pipe(map(p => p.id));
    // console.log(id)

    this.route.params.subscribe(data => {
      console.log(data)
    })

    this.originForm = JSON.stringify(this.form.value);
  }

  // 抽奖费用的逻辑函数
  costChange(val, key) {
    console.log(val, key);
    if (!val) {
      this.form.patchValue({
        [key]: ''
      })
    }
  }

  // 设置城市
  settingCitys() {
    this.citys.push(this.fb.control('南山'));
  }

  // 删除城市
  deleteCity(index) {
    console.log(index)
    this.citys.removeAt(index)
  }

  // 预览图片
  handlePreview(file: UploadFile) {
    console.log(file);
    this.previewImage = file.url || file.thumbUrl;
    console.log(this.fileList);
    this.previewVisible = true;
  }

  // 点击取消
  cancel(e: MouseEvent): void {
    e.preventDefault();
    history.go(-1);
  }

  // 提交表单
  submitForm(): void {
    // console.log(this.form.value);

    let { startDate, endDate, startTime, endTime } = this.form.value;
    startDate = dateformat(startDate, 'yyyy-mm-dd');
    endDate = dateformat(endDate, 'yyyy-mm-dd');
    startTime = dateformat(startTime, 'hh:MM:ss');
    endTime = dateformat(endTime, 'hh:MM:ss');

    let form = { ...this.form.value, startDate, endDate, startTime, endTime }

    console.log(form);

    this.message.success('保存成功');
  }

  // 提交奖品设置表单
  submitPrizeForm(): void {
    console.log(this.prizeForm.value);
  }

  // 修改单个值
  // updateName() {
  //   this.name.setValue('hhhhhhh')
  //   console.log(this.name.value)
  // }

  // // 更改一部分值
  // updateProfile() {
  //   this.profileForm.patchValue({
  //     firstName: 'Nancy',
  //     address: {
  //       street: 'ooooooo'
  //     }
  //   })
  // }

  // onSubmit() {
  //   console.log(this.profileForm.value);
  //   console.log('---', this.profileForm.get('firstName').value, this.profileForm.value.firstName) // 获取表单中某个值
  // }

  // get aliases() {
  //   return this.profileForm1.get('aliases') as FormArray;
  // }

  // addAlias() {
  //   this.aliases.push(this.fb.control(''));
  // }

  // onSubmit1() {
  //   console.log(this.profileForm1.value);
  // }

  changePage(page: number) {
    console.log("当前页", page);
    this.pageIndex = page;
  }




}
