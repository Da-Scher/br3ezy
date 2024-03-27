import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem("token");

  if (!authService.isAdmin(token)) {
    router.navigate(["/"]);
    return false;
  }
  return true;
};
