import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ItemsService } from '@@core/services/items.service';
@Injectable({ providedIn: 'root' })
export class ItemUpdateQuestionsResolver implements Resolve<any> {
  constructor(private itemService: ItemsService, private router: Router) {}

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const item_id = next.paramMap.get('id');
    return this.itemService.getItemQuestions(item_id).pipe(
      map((res) => {
        return [{ data: res['data'], item_id: item_id }];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
