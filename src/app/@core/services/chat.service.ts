import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient,) {
  }

  getChat(id) {
    return this.http
      .get(`${env.apiRoot}/auth/chat/all/${id}`, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }

  sendMessage(data: object) {
    return this.http
      .post(`${env.apiRoot}/auth/chat/sendmsg`, data, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }


  getAllMessages(data) {
    return this.http
      .post(`${env.apiRoot}/auth/chat/allmsgs`, data, httpOptions)
      .pipe(
        map((res) => {
          return res['data'];
        }),
        catchError((e) => throwError(e))
      );
  }
} //end of Class

