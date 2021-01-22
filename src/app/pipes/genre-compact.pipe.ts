import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../classes/genre';

@Pipe({
  name: 'genreCompact'
})
export class GenreCompactPipe implements PipeTransform {

  transform(value: Genre): string {
    return value.name+" ("+value.id+")";
  }

}
