import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem("token");

  if (!authService.isLoggedIn()) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }

  return authService.authorize(token).pipe(
    map((response) => {
      if (response.success && response.data.authorized) {
        return true;
      } else {
        router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }),
  );
};
