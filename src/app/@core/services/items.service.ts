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
export class ItemsService {
  constructor(private http: HttpClient) {}
  getAllItems(endPoint: string) {
    return this.http.get(`${env.apiRoot}/auth/${endPoint}`, httpOptions).pipe(
      map((res) => {
        return res;
      }),
      catchError((e) => throwError(e))
    );
  }
  addItem(data: object, endPoint: string) {
    return this.http
      .post(`${env.apiRoot}/auth/${endPoint}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  getItem(id: string, endPoint: string) {
    return this.http
      .get(`${env.apiRoot}/auth/${endPoint}/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  getItemQuestions(id: string) {
    return this.http
      .get(`${env.apiRoot}/auth/items/questions/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
  updateItem(id: string, data: object, endPoint: string) {
    return this.http
      .put(`${env.apiRoot}/auth/${endPoint}/${id}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  updateItemOptions(id: number, data: object) {
    return this.http
      .put(`${env.apiRoot}/auth/items/values/${id}`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  getItemOptionsValues(id: string) {
    return this.http
      .get(`${env.apiRoot}/auth/items/upoptions/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  deleteItem(id: number, endPoint: string) {
    return this.http
      .delete(`${env.apiRoot}/auth/${endPoint}/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  getFilters(value: string) {
    return this.http.get(`${env.apiRoot}/testpola/${value}`).pipe(
      map((res) => {
        console.log('res :data :', res['data']);
        return res['data'];
      }),
      catchError((e) => throwError(e))
    );
  }
  uploadPersonFaces(data: object) {
    return this.http
      .post(`${env.apiRoot}/auth/persons/faces`, data, httpOptions)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
  getItemByName(data: object) {
    return this.http
      .post(`${env.apiRoot}/auth/getitembyname`, data, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }
  markAsReturned(id: number) {
    return this.http
      .get(`${env.apiRoot}/auth/items/markasreturned/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }
} //end of class
