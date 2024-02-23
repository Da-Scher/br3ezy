import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StreamListing } from '../streamlisting';
import { ListingService } from '../listing.service';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [RouterLink, VideoplayerComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  listingService = inject(ListingService);
  streamListing: StreamListing | undefined; // it's okay to be undefined. plz dont crash

  constructor() {
    const streamListingId = Number(this.route.snapshot.params['id']);
    this.streamListing = this.listingService.getStreamListingById(streamListingId); // request the page-specific stream information by its ID
  }
}
