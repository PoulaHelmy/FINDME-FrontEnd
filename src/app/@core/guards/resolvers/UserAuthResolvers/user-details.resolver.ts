import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from 'app/@auth/services/auth.service';
@Injectable({ providedIn: 'root' })
export class UserDetailsResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.authService.getDetails().pipe(
      map((res) => {
        return res['data'];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
