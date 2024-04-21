import { Component, OnInit, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { io } from "socket.io-client";
import { CommonModule } from "@angular/common";
import { AuthService } from "../auth/auth.service";
import { Router, RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
  imports: [CommonModule, FormsModule, RouterLink],
})
export class ChatComponent implements OnInit {
  @Input() streamID: number | undefined;
  message!: string;
  messages: string[] = [];
  socket: any;
  user: any;
  parentRoute: any;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  url = window.location.protocol + '//' + window.location.host;

  ngOnInit(): void {
    this.parentRoute = this.router.url;
    this.socket = io(this.url);
    this.socket.on("receiveMessage", (msg: any) => {
      this.messages.unshift(
        `<strong>${msg.username}</strong>: ${msg.body}`,
      );
    });

    const token = localStorage.getItem("token");
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getUser(token);
    }
  }

  sendMessage() {
    const payload = {
      userId: this.user.id,
      username: this.user.username,
      streamId: this.streamID,
      body: this.message,
    };
    this.socket.emit("newMessage", payload);
    this.message = "";
  }
}
