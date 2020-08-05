import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgDefualt',
})
export class ImgDefualtPipe implements PipeTransform {
  transform(imgUrl: string, placeholder: string): any {
    let image = imgUrl ? imgUrl : placeholder;
    return image;
  }
}
