import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ItemsService } from '@@core/services/items.service';

@Injectable({ providedIn: 'root' })
export class PersonUpdateResolver implements Resolve<any> {
  constructor(private itemServ: ItemsService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.itemServ.getItem(pageId, 'items').pipe(
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
