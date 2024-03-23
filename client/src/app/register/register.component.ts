import { Component } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent {
  user = { username: "", email: "", password: "" };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register() {
    this.http
      .post("https://localhost:8000/api/auth/register", this.user, {
        responseType: "text",
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(["/login"]);
        },
        error: (error) => console.error(error),
      });
  }
}
