import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoUrlIframe'
})
export class VideoUrlIframePipe implements PipeTransform {

  transform(value: string| undefined): string {
    return "https://www.youtube.com/embed/"+(value!.split("=")[1]);
  }

}
