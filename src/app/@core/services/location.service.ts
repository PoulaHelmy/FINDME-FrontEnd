import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'X-Algolia-Application-Id': 'plBIPOQ7X7HA',
    'X-Algolia-API-Key': 'ce287ed40c8a6f4d8579799492461dd7',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}
  // https://places-dsn.algolia.net
  // $ curl -X POST 'https://places-dsn.algolia.net/1/places/query' --data '{"query": "Paris"}'
  // let data = { query: 'Paris' };
  chooseLocation(data: string) {
    this.http
      .post('https://places-dsn.algolia.net/1/places/query', data, httpOptions)
      .pipe(
        map((res) => {
          console.log('res :data :', res);
          return res;
        }),
        catchError((e) => throwError(e))
      );
  }
} //end of class
