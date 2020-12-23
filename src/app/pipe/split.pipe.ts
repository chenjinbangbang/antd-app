import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    // return null;
    // console.log(value, args);
    let number = args[0];
    return value.length > number ? value.substr(0, number) + '....' : value;
  }

}
