import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../classes/category';

@Pipe({
  name: 'categoryCompact'
})
export class CategoryCompactPipe implements PipeTransform {

  transform(value: Category): string {
    return value.name+" ("+value.price?.toFixed(2)+"€)";
  }

}
