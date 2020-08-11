import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {ItemsService} from '@@core/services/items.service';

@Injectable({providedIn: 'root'})
export class PersonDetailsResolver implements Resolve<any> {
  constructor(private itemServ: ItemsService, private router: Router) {
  }

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let userData = this.router.getCurrentNavigation().extras.state.userData;
    return this.itemServ.getItem(userData, 'items').pipe(
      map((res) => {
        return [{data: res}];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
