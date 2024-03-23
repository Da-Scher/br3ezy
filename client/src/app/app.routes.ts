import { Routes } from "@angular/router";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { WatchComponent } from "./watch/watch.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { AdminComponent } from "./admin/admin.component";
import { adminGuard } from "./admin/admin.guard";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "watch/:id", component: WatchComponent }, // :id is dynamic and will change based on how the route is requested by the code
  { path: "", component: GalleryComponent }, // I want to go home now
];
