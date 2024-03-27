import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  user = { username: "", email: "", password: "" };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  register() {
    this.authService
      .register(this.user.username, this.user.email, this.user.password)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/login"]);
        },
        error: (error) => console.error("Register failed", error),
      });
  }
}
