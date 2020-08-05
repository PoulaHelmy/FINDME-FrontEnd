import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, EMPTY, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ChatService} from '@@core/services/chat.service';

@Injectable({providedIn: 'root'})
export class ChatDetailsResolver implements Resolve<any> {
  constructor(private chatServ: ChatService) {
  }

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    const pageId = next.paramMap.get('id');
    return pageId
      ? this.chatServ.getChat(pageId).pipe(
        map((res) => {
          return res;
        }),
        catchError(() => {
          return of('No Data');
        })
      )
      : EMPTY;
  }
}
