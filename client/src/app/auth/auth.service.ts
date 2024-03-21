import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ success: boolean; data: { token: string } }>(
      "https://localhost:8000/api/auth/login",
      { username, password },
    );
  }

  isAdmin() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<{ success: boolean; data: { isAdmin: boolean } }>(
      "https://localhost:8000/api/auth",
      { headers },
    );
  }
}
