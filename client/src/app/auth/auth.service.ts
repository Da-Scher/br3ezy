import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

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
}
