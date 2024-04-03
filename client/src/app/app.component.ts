import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { RouterModule } from "@angular/router";
import { Router } from '@angular/router';
import { GalleryComponent } from "./gallery/gallery.component";
import { VideoplayerComponent } from "./videoplayer/videoplayer.component";
import { AuthService } from "./auth/auth.service";
import { NgIf } from "@angular/common";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    GalleryComponent,
    VideoplayerComponent,
    NgIf,
    SearchBarComponent,
    ThemeToggleComponent,
    MatIconModule
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  
  searchQuery: string = "";
  

  constructor(public authService: AuthService, private router: Router) {}


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
  }

  onSearch(query: string) {
    this.router.navigate(['/'], { queryParams: { q: query } });
  }

  get user() {
    const token = localStorage.getItem("token");
    return this.authService.getUser(token);
  }
}
