import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { jwtDecode } from "jwt-decode";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");

  if (!token) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const decoded: any = jwtDecode(token);
  const expiration = decoded.exp * 1000;
  const current = new Date().getTime();

  if (current >= expiration) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return true;
};
