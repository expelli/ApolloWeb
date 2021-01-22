import { Pipe, PipeTransform } from '@angular/core';
import { MovieAndScreening } from '../classes/movie-and-screening';


@Pipe({
  name: 'screeningCompact'
})
export class ScreeningCompactPipe implements PipeTransform {

  transform(mas: MovieAndScreening): string {
    let first_screening = mas.screening!.startTime
    return mas.movie!.title!+" ("+first_screening+")";
  }

}
