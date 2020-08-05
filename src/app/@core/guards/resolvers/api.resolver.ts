import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
@Injectable({ providedIn: 'root' })
export class ApiResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    const type = next.fragment;
    return pageId
      ? this.apiService.getItem(pageId, type).pipe(
          catchError(() => {
            return of('No Data');
          })
        )
      : EMPTY;
  }
}
