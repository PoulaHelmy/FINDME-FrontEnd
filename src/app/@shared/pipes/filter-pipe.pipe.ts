import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(itemList: any, searchKeyword: string) {
    if (!itemList) return [];
    if (!searchKeyword) return itemList;
    let filteredList = [];
    if (itemList.length > 0) {
      searchKeyword = searchKeyword.toLowerCase();
      itemList.forEach((item) => {
        //Object.values(item) => gives the list of all the property values of the 'item' object
        let propValueList = Object.values(item);
        for (let i = 0; i < propValueList.length; i++) {
          if (propValueList[i]) {
            if (
              propValueList[i].toString().toLowerCase().indexOf(searchKeyword) >
              -1
            ) {
              filteredList.push(item);
              break;
            }
          }
        }
      });
    }
    return filteredList;
  }
}
