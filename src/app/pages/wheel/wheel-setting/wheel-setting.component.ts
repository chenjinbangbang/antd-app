import { Component, OnInit } from '@angular/core';
import { NzModalService, NzMessageService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { ActivatedRoute, CanLoad, CanActivate, CanActivateChild, CanDeactivate } from '@angular/router';
// import { map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import dateformat from 'dateformat';

import { FormControl, FormGroup, FormBuilder, Validators, FormArray, AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { WheelService } from 'src/app/service/wheel.service';
import { CommonService } from 'src/app/service/common.service';

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
  // idAsyncValidator = (control: FormControl) => new Observable((observer: Observer<ValidationErrors | null>) => {
  //   setTimeout(() => {
  //     if (control.value === '100') {
  //       observer.next({ error: true, duplicated: true })
  //     } else {
  //       observer.next(null);
  //     }
  //     observer.complete();
  //   }, 1000);
  // });

  rotaryTableId = ''; // 活动id
  // 表单数据
  form = this.fb.group({
    // rotaryTableId: [''],
    title: ['', [Validators.required, Validators.maxLength(128)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    prepareStartDate: [null, [Validators.required]],
    prepareEndDate: [null, [Validators.required]],
    everydayFree: [false],
    everydayFreeCount: [''],
    topUpPresented: [false],
    topUpAmount: [''],
    candyExchange: [false],
    candyExchangeAmount: [''],
    pay: [false],
    payAmount: [1],
    // citys: this.fb.array([
    //   // this.fb.control({ cityMunicipalityId: 1, cityName: '深圳' })
    // ]),
    lotteryCycle: ['', [Validators.required]],
    rule: ['', [Validators.required, Validators.maxLength(1000)]],
    // prizes: this.fb.array([
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ }),
    //   this.fb.control({ })
    // ]),
    backgroundImageUrl: [''],
    rotaryTableImageUrl: ['']
  }, { validators: this.costValidator })
  // get citys() {
  //   return this.form.get('citys') as FormArray;
  // }
  citys: any[] = []; // form表单中的城市列表

  // 抽奖费用必须选择一项
  costValidator(control: FormGroup): ValidationErrors | null {
    const everydayFree = control.get('everydayFree');
    // const topUpPresented = control.get('topUpPresented');
    const candyExchange = control.get('candyExchange');
    const pay = control.get('pay');

    // let isPass = everydayFree.value || topUpPresented.value || candyExchange.value || pay.value
    let isPass = everydayFree.value || candyExchange.value || pay.value

    return !isPass ? { costError: true } : null
  }
  // get prizes() {
  //   return this.form.get('prizes') as FormArray;
  // }
  prizes: any[] = [{}, {}, {}, {}, {}, {}, {}, {}]; // 奖品列表
  prizeIndex: number = 0; // 选中奖品索引
  backgroundFileList: any[] = []; // 背景模板底图
  rotaryTableFileList: any[] = []; // 转盘模板底图
  originForm: string = ''; // 表单字符串，用于判断表单是否修改过

  // 选择城市
  isCityVisible: boolean = false; // 选择城市弹框
  regionList: any[] = []; // 地区列表
  provinceList: any[] = []; // 省份列表
  cityList: any[] = []; // 城市列表
  region_code: string = ''; // 选中的地区
  province_code: string = ''; // 选中的省份
  selectCityList: any[] = [] // 选中的城市
  selectCityIds: number[] = [] // 选中的城市id


  // 中奖概率校验
  prizeRateValidator = (control: FormControl): ValidationErrors | null => {
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

      // console.log('----', this)

      for (let item of this.winnerNumbers) {
        if (val.includes(Number(item))) {
          return { repeatEAllError: true };
        }
      }

    }
    return null;
  }

  // 奖品设置表单数据
  prizeForm = this.fb.group({
    id: [''],
    type: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    amount: [''], // 金额，奖品为现金时必填，糖果数量，奖品为糖果时必填 
    imageUrl: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    entityImageUrls: this.fb.array([]),
    winnerNumbers: ['', [Validators.required, Validators.maxLength(500), this.prizeRateValidator]],
    everydayQuantity: ['', [Validators.required]],
    allQuantity: [''],
  })
  prizeId: string = ''
  imageUrlList: any[] = []; // 转盘上的奖品图片
  entityImageUrls: any[] = []; // 奖品实物图片

  // 已经输入的中奖概率数组
  winnerNumbers: number[] = [];
  // get winnerNumbers() {
  //   let winners: number[] = [];
  //   for(let item of this.prizes) {
  //     winners.concat(item.winnerNumbers.split(';'))
  //   }
  //   console.log('winnerNumbers', winnerNumbers);
  //   return winnerNumbers;
  // }

  // 奖品类型数据
  goodsTypeList: any[] = [{
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
  goodsTypeData: object = {
    'CASH': "Cash",
    'ENTITY': "Entity",
    'CANDY': "Candy",
    'NOTHING': "Nothing"
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
  loading: boolean = false; // 加载中
  isVisible: boolean = false; // 奖品模态框

  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private wheelService: WheelService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      console.log('queryParams', data);
      // 若路由存在rotaryTableId，则是编辑活动页面，否则是添加活动
      if (data.rotaryTableId) {
        this.rotaryTableId = data.rotaryTableId;

        // get the rotary table info details（获取某个活动详情）
        this.getDetail();
      } else {
        // 初始化奖品列表
        let prizes: any[] = [];
        for (let i = 0; i < 8; i++) {
          prizes.push({
            allQuantity: '',
            amount: '',
            description: "",
            entityImageUrls: [],
            everydayQuantity: '',
            imageUrl: "",
            name: "",
            type: null,
            winnerNumbers: "",
          })
          // prizes.push({
          //   allQuantity: 100,
          //   amount: 30,
          //   description: "奖品描述奖品描述",
          //   entityImageUrls: [],
          //   everydayQuantity: 20,
          //   imageUrl: "https://d2fcenhuvgkdg9.cloudfront.net/default/71b18853-1fbc-4deb-99ba-6a981bb2f6ee.jpg",
          //   name: "华为meta40",
          //   type: "ENTITY",
          //   winnerNumbers: `10${i};20${i}`,
          // })
        }
        this.prizes = prizes;
      }
    })

    // 获取地区列表
    this.commonService.getRegionList({ country_id: '173' }).subscribe((res: any) => {
      console.log('获取地区列表：', res);
      this.regionList = res.data;
      this.region_code = res.data[0].code;

      // 获取省份列表，并且默认选中第一个省份
      this.getProvinceList(this.region_code);
    })
  }

  // get the rotary table info details（获取某个活动详情）
  getDetail() {
    this.loading = true;
    // let { rotaryTableId } = this.form.value

    this.wheelService.rotaryTableDetail(this.rotaryTableId).subscribe((res: any) => {
      console.log('get the rotary table info details（获取某个活动详情）', res);

      // 处理图片
      this.backgroundFileList = [res.data.backgroundImageUrl]
      this.rotaryTableFileList = [res.data.rotaryTableImageUrl]

      // 处理奖品表格
      // this.prizeInfos = res.prizeInfos
      this.prizes = res.data.prizeInfos
      res.data.startTime = dateformat(dateformat(new Date(), 'yyyy-mm=dd') + ' ' + res.data.startTime);
      res.data.endTime = dateformat(dateformat(new Date(), 'yyyy-mm=dd') + ' ' + res.data.endTime);
      delete res.data.prizeInfos

      this.form.patchValue(res.data);
      this.citys = res.data.citys;

      console.log('城市', this.citys);

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

  // ====================================== 设置城市 ======================================
  // 获取省份列表，并且默认选中第一个省份
  getProvinceList(region_code) {
    // 获取省份列表
    this.commonService.getProvinceList({ region_code }).subscribe((res: any) => {
      console.log('获取省份列表：', res);
      this.provinceList = res.data;
      this.province_code = res.data[0].province_code;

      // 获取城市列表
      this.getCityMunicipalityList(this.province_code);
    })
  }

  // 获取城市列表
  getCityMunicipalityList(province_code) {
    // 获取城市列表
    this.commonService.getCityMunicipalityList({ province_code }).subscribe((res: any) => {
      console.log('获取城市列表', res);
      this.cityList = res.data;
    })
  }

  // 选择地区
  changeRegion(val) {
    console.log('选择地区', val);

    // 获取地区列表，并且默认选中第一个省份
    this.getProvinceList(val);
  }

  // 选择省份
  changeProvince(val) {
    console.log('选择省份', val);

    // 获取城市列表
    this.getCityMunicipalityList(val);
  }

  // 选中城市
  selectCity(data) {
    let index: number = this.selectCityIds.indexOf(data.city_municipality_id);
    // for(let i of this.selectCityList) {
    //   if(this.selectCityList[i].cityMunicipalityId === data.city_municipality_id) {
    //     index = i;
    //   }
    // }

    console.log('选中城市', index);

    if(index > -1) {
      this.selectCityList.splice(index, 1);
      this.selectCityIds.splice(index, 1);
    } else {
      this.selectCityList.push({
        cityMunicipalityId: data.city_municipality_id,
        cityName: data.city_name
      })
      this.selectCityIds.push(data.city_municipality_id);
    }
    console.log(this.selectCityIds);
  }

  // 设置城市
  settingCitys() {
    // 获取地区列表
    // this.commonService.getRegionList({ country_id: '173' }).subscribe((res: any) => {
    //   console.log('获取地区列表：', res);
    //   this.regionList = res;
    //   this.region_code = res[0].code;

    //   // 获取省份列表，并且默认选中第一个省份
    //   this.getProvinceList(this.region_code);
    // })

    
    this.selectCityList = JSON.parse(JSON.stringify(this.citys))

    let selectCityIds: number[] = [];
    for(let item of this.selectCityList) {
      selectCityIds.push(item.cityMunicipalityId);
    }
    this.selectCityIds = selectCityIds;

    this.isCityVisible = true;
  }

  // 保存城市
  saveCity(){
    this.isCityVisible = false;
    // for(let item of this.selectCityList) {
    //   this.citys.push(this.fb.control(item));
    // }

    this.citys = this.selectCityList
  }

  // 删除城市
  deleteCity(index) {
    // console.log(index)
    // this.citys.removeAt(index)
    this.citys.splice(index, 1);
  }

  // 上传图片
  changeFile(fileList, key) {
    console.log('changeFIle', fileList);
    this[key] = fileList;
  }

  // 点击取消
  cancel(e: MouseEvent): void {
    e.preventDefault();

    this.modal.confirm({
      nzTitle: "Are you sure to leave without saving?",
      nzOkText: "Leave",
      nzCancelText: "Cancel",
      nzOnOk() {
        history.go(-1);
      },
      nzOnCancel() {
      }
    })


  }

  // 提交表单
  submitForm() {
    // console.log(this.form.value);

    // 处理表单数据
    let { startDate, endDate, startTime, endTime, prepareStartDate, prepareEndDate } = this.form.value;

    // 处理中奖人身份限制
    let cityMunicipalityIds: any[] = [];
    for (let item of this.citys) {
      cityMunicipalityIds.push(item.cityMunicipalityId)
    }

    this.form.patchValue({
      backgroundImageUrl: this.backgroundFileList[0],
      rotaryTableImageUrl: this.rotaryTableFileList[0]
    })

    console.log('校验是否通过', this.form.valid);
    // 校验是否通过
    if (this.form.valid) {

      // 时间校验
      if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
        // 活动结束日期不能小于活动开始日期
        return this.message.error('The end date of the activity cannot be less than the start date of the activity');
      }

      if (new Date(startTime).getTime() > new Date(endTime).getTime()) {
        // 活动结束时间不能小于活动开始时间
        return this.message.error('The end time of the activity cannot be less than the beginning time of the activity');
      }

      if (new Date(prepareStartDate).getTime() > new Date(prepareEndDate).getTime()) {
        // 活动预热结束时间不能小于活动预热开始时间
        return this.message.error('The end time of activity preheating should not be less than the beginning time of activity preheating');
      }

      // 奖品设置校验
      let prizesNum = this.prizes.filter(item => {
        return item.name;
      })
      console.log('已经设置的奖品数量：', prizesNum);
      if (prizesNum.length !== 8) {
        // 请对8个奖品进行设置
        return this.message.error('Please set up 8 prizes');
      }

      let nothingPrizeNum = this.prizes.filter(item => {
        return item.type === 'NOTHING';
      });
      console.log('类型为未中奖的奖品数量：', nothingPrizeNum);
      if (nothingPrizeNum.length === 0) {
        // 请设置一个未中奖的奖品
        return this.message.error('Please set up a prize that does not win');
      }
      if (nothingPrizeNum.length > 1) {
        // 只能设置一个未中奖的奖品
        return this.message.error('Only one unwon prize can be set');
      }

      if (!this.form.value.backgroundImageUrl) {
        // 请上传背景模板实图
        return this.message.error('Please upload Background Template');
      }

      if (!this.form.value.rotaryTableImageUrl) {
        // 请上传转盘模板底图
        return this.message.error('Please upload Spinning Wheel Template');
      }

      // 处理时间格式
      startDate = dateformat(startDate, 'yyyy-mm-dd');
      endDate = dateformat(endDate, 'yyyy-mm-dd');
      startTime = dateformat(startTime, 'hh:MM:ss');
      endTime = dateformat(endTime, 'hh:MM:ss');
      prepareStartDate = dateformat(prepareStartDate, 'yyyy-mm-dd hh:MM:ss');
      prepareEndDate = dateformat(prepareEndDate, 'yyyy-mm-dd hh:MM:ss');

      let form = {
        ...this.form.value,
        startDate,
        endDate,
        startTime,
        endTime,
        prepareStartDate,
        prepareEndDate,
        prizes: this.prizes,
        cityMunicipalityIds
      }

      if(this.rotaryTableId) {
        form.rotaryTableId = this.rotaryTableId
      }

      // delete form.citys;

      console.log('提交表单', form);

      // 需要23个参数
      // save the rotary table info（添加/编辑大转盘活动）
      this.wheelService.rotaryTable(form).subscribe((res: any) => {
        this.message.success('Successfully Saved');
        history.go(-1);
      })
    } else {

      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].updateValueAndValidity();
      }
    }

  }

  // ===================================== 奖品设置 ============================================
  // 点击设置奖品
  settingPrize(e: MouseEvent, i, id) {
    console.log('选中的奖品', i, id, this.prizes[i]);
    e.preventDefault();

    this.prizeForm.reset();

    this.prizeId = id;
    this.prizeIndex = i;
    this.isVisible = true;

    // 更新已经输入的中奖概率数组，不包括当前选中的奖品
    this.uploadWinnerNumbers(i);

    this.imageUrlList = this.prizes[i].imageUrl ? [this.prizes[i].imageUrl] : [];
    console.log('imageUrlList', this.imageUrlList)

    this.entityImageUrls = this.prizes[i].entityImageUrls;

    this.prizeForm.patchValue(this.prizes[i]);
  }

  // 更新已经输入的中奖概率数组，不包括当前选中的奖品
  uploadWinnerNumbers(i) {
    let winnerNumbers: number[] = [];
    for (let index in this.prizes) {
      if (index !== String(i) && this.prizes[index].winnerNumbers) {
        winnerNumbers.push(...this.prizes[index].winnerNumbers.split(';'))
      }
    }
    console.log('winnerNumbers', winnerNumbers);
    this.winnerNumbers = winnerNumbers;
  }

  // 取消奖品设置表单
  prizeCancel = (e: MouseEvent) => {
    e.preventDefault();
    // this.prizeForm.reset();
    // console.log(this.prizeForm.controls);

    this.isVisible = false;
  }

  // 提交奖品设置表单
  submitPrizeForm() {
    console.log('提交奖品设置表单')
    console.log(this.prizeForm.value);

    this.prizeForm.patchValue({
      imageUrl: this.imageUrlList[0],
      entityImageUrls: this.entityImageUrls
    })

    console.log('校验是否通过', this.prizeForm.valid);
    // 校验是否通过
    if (this.prizeForm.valid) {
      let params = this.prizeForm.value

      // 新增则不传id
      if (!this.rotaryTableId) {
        delete params.id;
      }

      // 编辑10个参数，新增9个参数
      console.log(params);

      this.prizes[this.prizeIndex] = params;
      console.log(this.prizes);

      this.isVisible = false;
    } else {
      for (const i in this.prizeForm.controls) {
        this.prizeForm.controls[i].markAsDirty();
        this.prizeForm.controls[i].updateValueAndValidity();
      }

      if (!this.prizeForm.value.imageUrl) {
        // 请上传转盘上的奖品图片
        return this.message.error('Please upload Thumbnail');
      }
    }
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

}
