import { Injectable } from '@angular/core';
import { StreamListing } from './streamlisting';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor() { }

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
    {
      id: 4,
      name: 'Ninja',
      city: 'Taylor',
      state: 'Michigan',
      photo: 'https://images.firstpost.com/wp-content/uploads/2019/08/ninja-streamer.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },
    {
      id: 5,
      name: 'Pokimane',
      city: 'Parts Unknown',
      state: 'Earth',
      photo: 'https://dotesports.com/wp-content/uploads/2022/06/20005308/Feature-Image-18.jpg',
      // photo: `${this.baseUrl}/example-house.jpg`, NOTE, this.baseUrl could be useful when the server has a domain
      availableUnits: 99,
      wifi: true,
      laundry: true, // does linus do his own laundry? 
    },
  ]


  getAllStreamListings(): StreamListing[] { // a nice function that returns the entire StreamListing array from above
    return this.streamListingList;
  }

  getStreamListingById(id: number) : StreamListing | undefined { // another cool function to get listings by their ID
    return this.streamListingList.find(streamListing => streamListing.id === id);
  }

}
