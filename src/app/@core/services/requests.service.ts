import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
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
export class RequestsService {
  constructor(private http: HttpClient) {}
  getAllRequests() {
    return this.http
      .post(`${env.apiRoot}/auth/requests/incoming`, '', httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  } //end of getAllRequests
  approveRequest(data: object) {
    return this.http
      .post(`${env.apiRoot}/auth/requests/change/status`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
} //end of class
