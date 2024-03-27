import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";
import { GalleryComponent } from "./gallery/gallery.component";
import { VideoplayerComponent } from "./videoplayer/videoplayer.component";
import { AuthService } from "./auth/auth.service";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    GalleryComponent,
    VideoplayerComponent,
    NgIf,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  get user() {
    const token = localStorage.getItem("token");
    return this.authService.getUser(token);
  }
}
