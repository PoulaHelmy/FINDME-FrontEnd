import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class RequestPasswordResolver implements Resolve<any> {
  constructor(private http: HttpClient) {}
  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const type = next.fragment;
    return type
      ? this.http.get(`http://findme.test/api/password/find/${type}`).pipe(
          catchError(() => {
            return of('No Data');
          })
        )
      : EMPTY;
  }
} //End of Class
