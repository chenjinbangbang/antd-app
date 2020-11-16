import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { ActivatedRoute, CanLoad, CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
// import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import dateformat from 'dateformat';

import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { ConfigService } from 'src/app/service/config.service';

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
    rotaryTableId: ['', [Validators.required], [this.idAsyncValidator]],
    title: ['', [Validators.required, Validators.maxLength(10)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    hotStartTime: [null, [Validators.required]],
    hotEndTime: [null, [Validators.required]],
    everydayFree: [false],
    everydayFreeCount: [''],
    topUpPresented: [false],
    topUpAmount: [''],
    candyExchange: [false],
    candyExchangeAmount: [''],
    pay: [false],
    payAmount: [1],
    citys: this.fb.array([
      this.fb.control({ cityMunicipalityId: 1, cityName: '深圳' })
    ]),
    lotteryCycle: ['', [Validators.required]],
    rule: ['', [Validators.required, Validators.maxLength(1000)]],
    backgroundImageUrl: [''],
    rotaryTableImageUrl: ['']
  })
  get citys() {
    return this.form.get('citys') as FormArray;
  }
  isEdit: boolean = false; // 是否是编辑活动页面
  fileList = [];
  previewImage: string = ''; // 预览的图片
  previewVisible: boolean = false; // 预览的图片弹框
  originForm: string = ''; // 表单字符串，用于判断表单是否修改过

  // 中奖概率校验
  prizeRateValidator(control: FormControl): ValidationErrors | null {
    // console.log(control);
    let val = control.value;

    if (val) {
      let reg = new RegExp(/[^\d;]/);
      if (reg.test(val)) {
        return { regError: true };
      }

      let arr = val.split(';');
      // console.log(arr);
      for (let i in arr) {
        if (!arr[i]) {
          return { inputError: true };
        }

        let num = Number(arr[i]);
        if (num < 1 || num > 1000) {
          return { rangeError: true };
        }

        for (let y in arr) {
          if (i !== y) {
            if (arr[i] === arr[y]) {
              return { repeatError: true };
            }
          }
        }
      }
    }
    return null;
  }

  // 奖品设置表单数据
  prizeForm = this.fb.group({
    id: ['', [Validators.required]],
    type: ['CASH', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    goodsCost: [''], // 金额，奖品为现金时必填
    goodsCandyNum: [''], // 糖果数量，奖品为糖果时必填
    imageUrl: ['', [Validators.required]],
    goodsDescribe: ['', [Validators.required, Validators.maxLength(500)]],
    goodsImgList: this.fb.array([]),
    winnerNumbers: ['', [Validators.required, Validators.maxLength(500), this.prizeRateValidator]],
    everydayQuantity: ['', [Validators.required]],
    allQuantity: ['', [Validators.required]],
  })
  prizeId: string = ''
  // 奖品类型数据
  goodsTypeList: any[] = [{
    value: "CASH",
    name: "现金"
  }, {
    value: "ENTITY",
    name: "实物奖品"
  }, {
    value: "CANDY",
    name: "糖果"
  }]
  goodsTypeData: object = {
    'CASH': "现金",
    'ENTITY': "实物奖品",
    'CANDY': "糖果"
  }

  // 奖品表格数据
  prizeInfos: any[] = [
    // {
    //   id: 'MW0001',
    //   goods: '商品1',
    //   imageUrl: 'assets/1.png',
    //   type: '1',
    //   name: 'xxxx品牌笔记本',
    //   winnerNumbers: "100;200",
    //   everydayQuantity: 50,
    //   allQuantity: 5000
    // }
  ];

  pageIndex: number = 1; // 当前页码
  loading: boolean = false; // 加载中
  activityId: string = ""; // 当前选中的活动
  operationType: number = 1; // 操作类型，1：开启，2：停用，3：删除，4：已关联内容，无法删除
  operationTypeText: object = {
    1: "开启",
    2: "停用",
    3: "删除"
  }

  isVisible: boolean = false; // 奖品模态框
  modalContent: string = ""; // 模态框标题

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private configService: ConfigService
  ) {
    // route.params.subscribe(data => {
    //   console.log('---', data)
    // })

  }

  ngOnInit() {
    // console.log(this.form.value);

    // console.log(this.route)
    // console.log("获取动态路由", this.route.params); // 获取动态路由
    // console.log("获取get传值", this.route.queryParams); // 获取get传值
    // this.route.queryParams.subscribe((data) => {  // 获取get传值
    //   console.log("获取get传值", data);
    // });

    // let id: Observable<string> = this.route.params.pipe(map(p => p.id));
    // console.log(id)

    this.route.params.subscribe(data => {
      console.log(data);
      // 若路由存在rotaryTableId，则是编辑活动页面，否则是添加活动
      if (data.rotaryTableId) {
        this.form.patchValue({
          rotaryTableId: data.rotaryTableId,
          isEdit: true
        })

        // get the rotary table info details（获取某个活动详情）
        // this.getDetail();
      }
    })

    // this.originForm = JSON.stringify(this.form.value);
  }

  // get the rotary table info details（获取某个活动详情）
  getDetail() {
    this.loading = true;
    let { rotaryTableId } = this.form.value

    let url = `/api/setting/v1/rotary/table/${rotaryTableId}`;
    this.configService.request(url, 'GET').subscribe((res: any) => {
      console.log('get the rotary table info details（获取某个活动详情）', res);

      this.prizeInfos = res.prizeInfos

      res.startTime = dateformat(dateformat(new Date(), 'yyyy-mm=dd') + ' ' + res.startTime);
      res.endTime = dateformat(dateformat(new Date(), 'yyyy-mm=dd') + ' ' + res.endTime);

      delete res.prizeInfos
      
      this.form.patchValue(res);
      this.loading = false;
    })
  }

  // 抽奖费用的逻辑函数
  costChange(val, key) {
    // console.log(val, key);
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
    // console.log(index)
    this.citys.removeAt(index)
  }

  // 上传文件 https://devraffleserviceapi.fortunepay.com.ph/apij/setting/v1/image/upload
  uploadChange = (val: UploadXHRArgs) => {
    console.log('上传文件', val);

    let formData = new FormData();
    formData.append('file', val.file);
    console.log('file', formData.get('file'))

    let url = '/api/setting/v1/image/upload'
    this.configService.request(url, 'POST', formData).subscribe((res: any) => {
      console.log('上传文件成功', res)
    })
  }

  change(e){
    console.log(e);
    let url = '/api/setting/v1/image/upload'
    this.configService.request(url, 'POST', { file: e.target.files[0] }).subscribe((res: any) => {
      console.log('上传文件成功', res)
    })
  }

  // 预览图片
  handlePreview(file: UploadFile) {
    // console.log(file);
    this.previewImage = file.url || file.thumbUrl;
    // console.log(this.fileList);
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

    // console.log(form);

    this.message.success('保存成功');
  }

  // ===================================== 奖品设置 ============================================
  // 点击设置奖品
  settingPrize(e: MouseEvent, i, id) {
    console.log('选中的奖品', i, id);
    e.preventDefault();

    this.prizeId = id;
    this.isVisible = true;

    // this.prizeForm.patchValue(this.prizeInfos[i]);
  }

  // 取消奖品设置表单
  prizeCancel(e: MouseEvent) {
    e.preventDefault();
    // this.prizeForm.reset();
    console.log(this.prizeForm.controls);

    this.isVisible = false;
  }

  // 提交奖品设置表单
  submitPrizeForm(): void {
    console.log('提交')
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

  // changePage(page: number) {
  //   console.log("当前页", page);
  //   this.pageIndex = page;
  // }




}
