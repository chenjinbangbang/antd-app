import { Component, OnInit } from '@angular/core';
// import { DataService } from 'src/app/service/data.service';
// import { SecurityService } from 'src/app/service/security.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  permissionSet: any = [];

  constructor(
    // private dataService: DataService,
    // private securityService: SecurityService
  ) { }

  ngOnInit() {
    // this.dataService.currentUser.subscribe((currentUser) => {
    //   if (Object.keys(currentUser).length > 0) {
    //     this.permissionSet = this.securityService.getPermission(currentUser, 'customer-support');
    //   }
    // });
  }

  navClick(val) {
    console.log(val)
  }

}
