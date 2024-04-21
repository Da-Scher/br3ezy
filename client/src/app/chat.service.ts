// https://medium.com/@AlexanderObregon/creating-a-real-time-chat-app-with-angular-and-socket-io-dcc79c27467d

import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  url = 'http://' + window.location.host;
  
  private socket = io(this.url);

  sendMessage(message: string){
    this.socket.emit('new-message', message);
  }

  getMessages() {
    let observable = new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new-message', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };  
    });
    return observable;
  }
}