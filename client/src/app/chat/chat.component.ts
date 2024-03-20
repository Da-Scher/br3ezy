import { Component, OnInit } from '@angular/core';
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
  message!: string;
  messages: string[] = [];
  socket: any;

  constructor() { }

  ngOnInit(): void {
    this.socket = io('https://localhost:8000');

    this.socket.on('receiveMessage', (msg: string) => {
      this.messages.push(JSON.stringify(msg));
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    var chatMessages = document.getElementById("chatMessages");
    if(chatMessages)
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  sendMessage() {
    const payload = {
      "userId": 1,
      "streamId": 1,
      "body": this.message
    }
    this.socket.emit('newMessage', payload);
    this.message = '';
  }
}
