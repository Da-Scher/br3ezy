import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { WatchComponent} from './watch/watch.component';
import { GalleryComponent } from './gallery/gallery.component';


export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'watch/:id', component: WatchComponent }, // :id is dynamic and will change based on how the route is requested by the code
  { path: '', component: GalleryComponent} // I want to go home now
];
