import { Component, OnInit, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [CommonModule, FormsModule]
})


export class ChatComponent implements OnInit {
  @Input() streamID: number | undefined;
  message!: string;
  messages: string[] = [];
  socket: any;

  constructor() { }

  ngOnInit(): void {
    this.socket = io('https://localhost:8000');
    this.socket.on('receiveMessage', (msg: any) => {
      this.messages.unshift(`<strong>Username</strong>: ${msg.body}`);
    });
  }

  sendMessage() {
    const payload = {
      "userId": 1,
      "streamId": this.streamID,
      "body": this.message
    }
    this.socket.emit('newMessage', payload);
    this.message = '';
  }
}
