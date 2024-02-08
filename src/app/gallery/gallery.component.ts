import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamListingComponent } from '../stream-listing/stream-listing.component'; // we can use this component now
import { StreamListing } from '../streamlisting'; // this is the interface 'all the stuff we can do' with the component

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, StreamListingComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})

export class GalleryComponent {

  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa'; // generic crap from the tutorial

  streamListingList: StreamListing[] = [
    {
      id: 0,
      name: 'Linus\'s Home Office',
      city: 'Portland',
      state: 'OR',
      photo: 'https://ofa.guru/wp-content/uploads/2020/11/linus-torvalds-guided-tour-of-his-home-office-youtube-thumbnail.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },
    {
      id: 1,
      name: 'Cthulu\'s House',
      city: 'R\'lyeh',
      state: 'South Pacific',
      photo: 'https://cdna.artstation.com/p/assets/images/images/052/142/696/large/jack-house-of-cthulu.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },
    {
      id: 2,
      name: 'Tom Bombadil\'s House',
      city: 'The Old Forest',
      state: 'Middle-Earth',
      photo: 'http://www.brickbuilt.org/wp-content/uploads/2016/10/Featured-10-16.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },
    {
      id: 3,
      name: 'WSUV',
      city: 'Vancouver',
      state: 'Washington',
      photo: 'https://globalresearchsyndicate.com/wp-content/uploads/2020/05/WSUV-COVID-Research-Clark-County-Today-Copy-of-WSU-Vancouver-Campus-3-11-20-01.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },

  ]
} // end class GalleryComponent
