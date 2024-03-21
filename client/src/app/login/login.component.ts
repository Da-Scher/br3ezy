import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user = { username: '', password: '' };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data.token);
        console.log('Login successful');
      },
      error: (error) => console.error('Login failed', error)
    });
  }
}
