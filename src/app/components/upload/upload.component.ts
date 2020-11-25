import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  previewImage: string = ''; // 预览的图片
  previewVisible: boolean = false; // 预览的图片弹框
  isSpinning: boolean = false; // 图片上传中

  @Input() length: number = 1; // 支持上传的图片长度
  @Input() fileList: any[] = []; // 图片数据，如["xxx/1.png"]
  @Input() multiple: boolean = false; // 是否支持多选
  // @Input() changeFile; // 改变图片数据，父组件的方法

  @Output() changeFile = new EventEmitter();

  constructor(
    private commonService: CommonService,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    // console.log(this.length, this.fileList)
  }

  // 添加图片
  async addImg(e) {
    console.log('添加图片', e);
    console.log(e.target.files)
    let types = ['image/jpeg','image/PNG'] // 支持上传的格式

    let files = e.target.files;

    this.isSpinning = true;

    if (e.target.files.length + this.fileList.length > this.length) {
      // 最多可输入n张图片
      return this.message.error(`Up to ${this.length} pictures can be entered`);
    }

    // 是否多选
    if (this.multiple) {
      // let files = e.target.files;



      let promises: any[] = [];
      for (let file of files) {

        if(!types.includes(file.type) || file.size > 1024 * 1024) {
          this.isSpinning = false;
          // 请上传1M以内的JPG，PNG图片
          this.message.error('Please upload JPG, PNG pictures within 1M');
        } else {
          promises.push(this.uploadFn(file));   
        }
      }
      // console.log('promises', promises)
      
      Promise.all(promises).then(res => {
        console.log('所有文件', res);

        setTimeout(() => {
          this.isSpinning = false;
        }, 1000);

        // this.fileList.push(res);
        let files = [...this.fileList, ...res]
        this.changeFile.emit(files);
      })
    } else {

      if(!types.includes(files[0].type) || files[0].size > 1024 * 1024) {
        this.isSpinning = false;
        // 请上传1M以内的JPG，PNG图片
        return this.message.error('Please upload JPG, PNG pictures within 1M');
      }

      let file = await this.uploadFn(files[0]);
      this.fileList.push(file);

      setTimeout(() => {
        this.isSpinning = false;
      }, 1000);

      this.changeFile.emit(this.fileList);
    }
  }

  // 上传文件
  uploadFn(file) {
    return new Promise((resolve, reject) => {

      let formData = new FormData();
      formData.append('file', file);
      console.log('file', formData.get('file'));

      this.commonService.imageUpload(formData).subscribe((res: any) => {
        console.log('上传文件成功', res)

        resolve(res.data.url)
      })
    });
  }

  // 预览图片
  previewImg(file) {
    this.previewImage = file;
    this.previewVisible = true;
  }

  // 删除图片
  deleteImg(file) {
    console.log('删除图片', file);
    let fileList = this.fileList;
    let index = fileList.indexOf(file);

    if (index > -1) {
      fileList.splice(index, 1);
      this.changeFile.emit(fileList);
    }
  }

  // 点击取消
  cancel(e: MouseEvent): void {
    e.preventDefault();
    history.go(-1);
  }

}
