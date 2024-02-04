import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GalleryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test';
}
