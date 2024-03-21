import { CanActivateFn } from "@angular/router";
import { Router } from "@angular/router";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem("token");
  if (!token) {
    router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
    return false;
  }
  return true;
};
