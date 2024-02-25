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

  streamListingList: StreamListing[] = []; // Holds a list of Stream Listings
  filteredListingList: StreamListing[] = []; // Holds a filtered list of Stream Listings
  listingService: ListingService = inject(ListingService); // inject data goodness from the listing service


  constructor() {
    this.listingService.getAllStreamListings().then((streamListingList: StreamListing[]) => {
        this.streamListingList = streamListingList;         // Get all the listings and put them in the array
        this.filteredListingList = streamListingList;      // start off the filtered list mirroring the array
      });
  }


  filterResults(text: string) {
    // if the search query is empty, show everything
    if (!text) { 
      this.filteredListingList = this.streamListingList;
      return;
    }
    // else, filter by the query. for each stream listing in the listing list, check if the title matches the query
    this.filteredListingList = this.streamListingList.filter(
      streamListing => streamListing?.title.toLowerCase().includes(text.toLowerCase())
    );
  }



} // end class GalleryComponent
