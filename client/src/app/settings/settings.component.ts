import { Component } from '@angular/core';
import { NgIf } from "@angular/common";
import { AuthService } from '../auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgIf],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  user: any;
  token: any;

  constructor(public authService: AuthService) {
    this.token = localStorage.getItem("token");
    this.setUser();
  }

  private setUser(): void {
    this.user = this.authService.getUser(this.token);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin(this.token);
  }


}
