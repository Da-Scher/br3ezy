import { CanActivateFn } from "@angular/router";
import { catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { inject } from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin().pipe(
    catchError((error) => {
      console.error(error);
      router.navigate(["/"]);
      return of(false);
    }),
  );
};
