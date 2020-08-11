import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
@Injectable({ providedIn: 'root' })
export class AllSubCatResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.apiService.getAllItems('subcategories').pipe(
      map((res) => {
        return res;
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
