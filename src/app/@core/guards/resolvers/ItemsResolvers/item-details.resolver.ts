import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemsService } from '@@core/services/items.service';
@Injectable({ providedIn: 'root' })
export class ItemDetailsResolver implements Resolve<any> {
  constructor(private itemService: ItemsService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.itemService.getItem(pageId, 'items').pipe(
          map((res) => {
            return res['data'];
          }),
          catchError(() => {
            return of('No Data');
          })
        )
      : EMPTY;
  }
}
