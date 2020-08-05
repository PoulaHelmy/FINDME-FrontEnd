import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import Pusher from 'pusher-js/with-encryption';
import { catchError, retry } from 'rxjs/operators';
import Pusher from 'pusher-js';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PusherService {
  // pusher.service.ts
  Pusher: any;
  // pusher: any;
  channel: any;

  constructor(private http: HttpClient) {
    this.Pusher = new Pusher(env.pusher.PUSHER_APP_KEY, {
      cluster: env.pusher.PUSHER_APP_CLUSTER,
    });
    this.channel = this.Pusher.subscribe('test-channel');
  }
  listen(event, callback) {
    this.channel = this.Pusher.subscribe(this.channel);
    console.log('subscribed to channel', this.channel);

    this.channel.bind(event, (res) => {
      console.log('pusher event', res);
      callback(res);
    });

    this.channel.bind('pusher:subscription_error', function (err) {
      console.log('pusher error', err);
    });
  }

  // like(num_likes) {
  //   this.http
  //     .post('http://localhost:3120/update', { likes: num_likes })
  //     .subscribe((data) => {});
  // }
  /**
   * Get all messages
   */
  fetch() {
    return this.http.get(env.apiRoot + 'messages', {
      headers: this._getHeaders(),
    });
  }

  /**
   * Send message to server
   * @param message
   */
  send(data) {
    return this.http.post(env.apiRoot + 'messages', data, {
      headers: this._getHeaders(),
    });
  }

  /**
   * Error callback
   * @param err
   * @private
   */
  private _checkErrorResponse(err = null) {
    return throwError('Unauthenticated');
  }

  /**
   * Construct request headers
   * @private
   */
  private _getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_tokne'),
    });
  }
} //end of class
