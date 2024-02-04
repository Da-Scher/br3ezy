import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamListing } from '../streamlisting';

@Component({
  selector: 'app-stream-listing',
  standalone: true,
  imports: [],
  templateUrl: './stream-listing.component.html',
  styleUrl: './stream-listing.component.css'
})
export class StreamListingComponent {
  @Input() streamListing!: StreamListing;  /* ! tells compiler that the input wont be null, promise
                                            * @Input() means we're passing an instance from child to parent */
}
