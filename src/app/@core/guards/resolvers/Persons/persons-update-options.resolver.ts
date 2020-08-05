import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map, take, delay } from 'rxjs/operators';
import { ApiService } from '@@core/http/api.service';
import { ItemsService } from '@@core/services/items.service';
import { CoreService } from '@@core/services/core-service.service';
import { FieldConfig } from '@@shared/models/field.interface';
@Injectable({ providedIn: 'root' })
export class PersonsUpdateOtpionsResolver implements Resolve<any> {
  constructor(
    private apiService: ApiService,
    private coreService: CoreService,
    private itemService: ItemsService,
    private router: Router
  ) {}

  resolve(next: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let AllResults: FieldConfig[] = [];
    let subCatId = this.router.getCurrentNavigation().extras.state.subCatId;
    let item_id = this.router.getCurrentNavigation().extras.state.item_id;
    let personId = this.router.getCurrentNavigation().extras.state.personId;
    let item_data;
    let all_inputs;
    return this.apiService
      .getItemSubcatsAllData({ item_id: item_id, subcat_id: subCatId })
      .pipe(
        map((res) => {
          item_data = res['data'][0];
          all_inputs = res['data'][1];
          for (let i = 0; i < all_inputs.length; i++) {
            let xx = this.coreService.mapControl(all_inputs[i]);
            for (let j = 0; j < item_data.length; j++) {
              if (xx['name'] === item_data[j]['name']) {
                xx['value'] = item_data[j]['value'];
              }
            }
            AllResults.push(xx);
          }
          return [{ data: AllResults, item_id: item_id, personId: personId }];
        }),
        catchError(() => {
          return of('No Data');
        })
      );
  }
}
