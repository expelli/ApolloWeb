import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'apiDatePipe'
})
export class ApiDatePipePipe extends DatePipe implements PipeTransform {

  transform(value: any,args?: any): any {
    return super.transform(value, args);
  }

}
