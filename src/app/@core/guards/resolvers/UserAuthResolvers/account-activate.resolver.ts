import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, EMPTY, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AcountActivatedResolver implements Resolve<any> {
  constructor(private http: HttpClient) {
  }

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    // console.log('dsds :', next);
    //api/auth/signup/activate/
    const type = next.fragment;
    return type
      ? this.http
        .get(`http://findme.test/api/auth/signup/activate/${type}`)
        .pipe(
          catchError(() => {
            return of('No Data');
          })
        )
      : EMPTY;
  }
}
