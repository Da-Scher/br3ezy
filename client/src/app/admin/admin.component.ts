import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [],
  templateUrl: "./admin.component.html",
  styleUrl: "./admin.component.css",
})
export class AdminComponent implements OnInit {
  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkAdmin();
  }

  checkAdmin(): void {
    this.authService.isAdmin().subscribe({
      next: (response) => {
        this.isAdmin = response.data.isAdmin;
        if (!this.isAdmin) {
          console.log("Access Denied: Must be an administrator");
          this.router.navigate(["/"]);
        }
      },
      error: (error) => {
        console.error(error);
        this.router.navigate(["/"]);
      },
    });
  }
}
