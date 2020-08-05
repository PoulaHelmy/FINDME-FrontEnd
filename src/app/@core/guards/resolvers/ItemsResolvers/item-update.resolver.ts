import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
@Injectable({ providedIn: 'root' })
export class ItemUpdateResolver implements Resolve<any> {
  constructor(private apiService: ApiService, private itemserv: ItemsService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.itemserv.getItem(pageId, 'items').pipe(
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
