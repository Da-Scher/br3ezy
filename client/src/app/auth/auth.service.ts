import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
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

  login(username: string, password: string) {
    return this.http.post<{ success: boolean; data: { token: string } }>(
      "https://localhost:8000/api/auth/login",
      { username, password },
    );
  }

  isAdmin(): Observable<boolean> {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    return this.http
      .get<{
        success: boolean;
        data: { isAdmin: boolean };
      }>("https://localhost:8000/api/auth", { headers })
      .pipe(map((response) => response.success && response.data.isAdmin));
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

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  getUser(): any {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    const user = decoded.user;
    return user;
  }
}
