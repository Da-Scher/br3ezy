import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";

interface JwtPayload {
  user: {
    id: number;
    username: string;
    role: string;
  };
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  url = window.location.protocol + '//' + window.location.host;

  login(username: string, password: string) {
    return this.http.post<{ success: boolean; data: { token: string } }>(
      this.url + "/api/auth/login",
      { username, password },
    );
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ success: boolean; data: { userId: string } }>(
      this.url + "/api/auth/register",
      { username, email, password },
    );
  }

  authorize(token: any) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{
      success: boolean;
      data: { authorized: boolean };
    }>(this.url + "api/auth", { headers });
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const decoded: any = jwtDecode(token);
    const expiration = decoded.exp * 1000;
    const current = new Date().getTime();
    const isExpired = expiration < current;

    return !isExpired;
  }

  isAdmin(token: any): boolean {
    const user = this.getUser(token);
    console.log(user)
    if (user.role === "admin") return true;
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  getUser(token: any): any {
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    const user = decoded.user;
    return user;
  }
}
