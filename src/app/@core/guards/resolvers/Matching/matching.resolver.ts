import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemsService } from '@@core/services/items.service';
import { ApiService } from '@@core/http/api.service';
@Injectable({ providedIn: 'root' })
export class MatchingResolver implements Resolve<any> {
  constructor(private apiServ: ApiService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.apiServ.getMatchedItems().pipe(
      map((res) => {
        return res['data'];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
