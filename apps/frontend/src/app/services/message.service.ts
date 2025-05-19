import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserMessage } from '../models/user-message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = '/api/messages';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<UserMessage[]> {
    return this.http.get<UserMessage[]>(this.apiUrl);
  }

  createMessage(
    message: Omit<UserMessage, 'id' | 'createdAt'>
  ): Observable<UserMessage> {
    return this.http.post<UserMessage>(this.apiUrl, message);
  }
}
