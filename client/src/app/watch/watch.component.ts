import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StreamListing } from '../streamlisting';
import { ListingService } from '../listing.service';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { StreamListingComponent } from '../stream-listing/stream-listing.component';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, VideoplayerComponent, StreamListingComponent, ChatComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  listingService = inject(ListingService);
  streamListing: StreamListing | undefined; // it's okay to be undefined. plz dont crash

  constructor() {
    const streamID = parseInt(this.route.snapshot.params['id'],10);

    this.listingService.getStreamListingById(streamID).then((streamListing: StreamListing | undefined)=> { // request stream from listing service by id
      this.streamListing = streamListing;
    });
  }
}
