import { Injectable } from '@angular/core';

import { environment as env } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}
  getAllNotifictions() {
    return this.http
      .get(`${env.apiRoot}/auth/notifications/all`, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }
  MakeNotifictionReaded(id: string) {
    return this.http
      .get(`${env.apiRoot}/auth/notifications/markread/${id}`, httpOptions)
      .toPromise()
      .then()
      .catch((e) => throwError(e));
  }
} //end of class
