import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { Router } from '@angular/router';
import { Chat } from '@interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public apiService: ApiService,
    public router: Router
  ) { }

  getAll(params: object): Observable<any> {
    return this.apiService.get<any>('/user/chats', params).pipe(
      tap((response: any) => {

      })
    );
  }

  // getOne(chat_id: number, params: object): Observable<any> {
  //   return this.apiService.get<any>(`/user/chats/${chat_id}`, params).pipe(
  //     tap((response: any) => {

  //     })
  //   );
  // }

  create(chat: Chat): Observable<any> {
    return this.apiService.post<any>('/user/chats', { chat: chat }).pipe(
      tap((response: any) => {

      })
    );
  }

}
