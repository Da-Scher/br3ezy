import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamListingComponent } from '../stream-listing/stream-listing.component';
import { StreamListing } from '../streamlisting';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, StreamListingComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})

export class GalleryComponent {

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  streamListing: StreamListing = {
    id: 9999,
    name: 'Test Home',
    city: 'Test city',
    state: 'ST',
    photo: '../assets/doom_cover.jpg',
   // photo: `${this.baseUrl}/example-house.jpg`,
    availableUnits: 99,
    wifi: true,
    laundry: false,
  };
}
