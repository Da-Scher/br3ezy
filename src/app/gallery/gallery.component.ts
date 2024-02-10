import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamListingComponent } from '../stream-listing/stream-listing.component'; // we can use this component now
import { StreamListing } from '../streamlisting'; // this is the interface 'all the stuff we can do' with the component
import { ListingService } from '../listing.service'; // this service delivers the data 

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, StreamListingComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})

export class GalleryComponent {

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa'; // generic crap from the tutorial

  streamListingList: StreamListing[] = []; // let there be an array which is hollow and empty
  listingService: ListingService = inject(ListingService); // inject data goodness from the listing service

  constructor() {
    this.streamListingList = this.listingService.getAllStreamListings(); // Call function from listing service to get that data
  }

} // end class GalleryComponent
