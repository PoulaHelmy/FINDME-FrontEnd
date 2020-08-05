import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {map, catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';

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
  constructor(private http: HttpClient, private db: AngularFireDatabase) {
  }

  // getMessagesList() {
  //   return this.db.object('Chat').valueChanges();
  // }
  //
  // getMessages(user) {
  //   return this.db
  //     .list('Chat/' + user + '/messages', ref => {
  //       return ref.orderByChild('timeStamp');
  //     })
  //     .valueChanges();
  // }
  //
  // SendMessage(user, message, chatID) {
  //   const messageData = {
  //     senderID: user.id,
  //     messageBody: message,
  //     senderName: user.name,
  //     timeStamp: new Date().getTime()
  //   };
  //   const agentMeta = {
  //     name: user.name,
  //     new: true
  //   };
  //   const userMeta = {
  //     new: false
  //   };
  //   this.db.list(`Chat/${chatID}/messages`).push(messageData);
  //   this.db.database.ref(`Chat/${chatID}/meta-data/agent`).update(agentMeta);
  //   this.db.database.ref(`Chat/${chatID}/meta-data/user`).update(userMeta);
  // }
  //
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

  // endConversation(chatID) {
  //   const agentMeta = {
  //     name: '',
  //     new: false
  //   };
  //   const userMeta = {
  //     new: false
  //   };
  //   this.db.database.ref(`Chat/${chatID}/meta-data/agent`).update(agentMeta);
  //   this.db.database.ref(`Chat/${chatID}/meta-data/user`).update(userMeta);
  // }

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

// private db: AngularFireDatabase
// getMessagesList() {
//   return this.db.object('Chat').valueChanges();
// }
// getMessages(user) {
//   return this.db
//     .list('Chat/' + user + '/messages', (ref) => {
//       return ref.orderByChild('timeStamp');
//     })
//     .valueChanges();
// }
// sendMessage(user, message, chatID) {
//   const messageData = {
//     senderID: user.id,
//     messageBody: message,
//     senderName: user.name,
//     timeStamp: new Date().getTime(),
//   };
//   const agentMeta = {
//     name: user.name,
//     new: true,
//   };
//   const userMeta = {
//     new: false,
//   };
//   this.db.list(`Chat/${chatID}/messages`).push(messageData);
//   this.db.database.ref(`Chat/${chatID}/meta-data/agent`).update(agentMeta);
//   this.db.database.ref(`Chat/${chatID}/meta-data/user`).update(userMeta);
// }
// endConversation(chatID) {
//   const agentMeta = {
//     name: '',
//     new: false,
//   };
//   const userMeta = {
//     new: false,
//   };
//   this.db.database.ref(`Chat/${chatID}/meta-data/agent`).update(agentMeta);
//   this.db.database.ref(`Chat/${chatID}/meta-data/user`).update(userMeta);
// }
