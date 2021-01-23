import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'videoUrlIframe'
})
export class VideoUrlIframePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: string| undefined): SafeResourceUrl {
    var url = "https://www.youtube.com/embed/"+(value!.split("=")[1])
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
