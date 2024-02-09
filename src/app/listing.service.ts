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
      user_id: 0,
      title: 'Linus\'s Stream',
      description: 'A peak into the life of Linus, creator of the Linux kernel.',
      start_time: 0,
      is_active: true,
      photo: 'https://ofa.guru/wp-content/uploads/2020/11/linus-torvalds-guided-tour-of-his-home-office-youtube-thumbnail.jpg'
    },
    {

      id: 1,
      user_id: 1,
      title: 'Cthulu\'s Crib',
      description: 'Cthulu shows off his South Pacific Ocean Crib / Prison.',
      start_time: 0,
      is_active: true,
      photo: 'https://cdna.artstation.com/p/assets/images/images/052/142/696/large/jack-house-of-cthulu.jpg'

    },
    {

      id: 2,
      user_id: 2,
      title: 'Tom\'s Green Thumb',
      description: 'Tom Bombadil sharing his thoughts on sustainable gardening in the Old Forest',
      start_time: 0,
      is_active: true,
      photo: 'http://www.brickbuilt.org/wp-content/uploads/2016/10/Featured-10-16.jpg'


    },
    {

      id: 3,
      user_id: 3,
      title: 'Tour WSUV',
      description: 'Explore the WSUV campus',
      start_time: 0,
      is_active: true,
      photo: 'https://globalresearchsyndicate.com/wp-content/uploads/2020/05/WSUV-COVID-Research-Clark-County-Today-Copy-of-WSU-Vancouver-Campus-3-11-20-01.jpg'

    },
    {

      id: 4,
      user_id: 4,
      title: 'Ninja Plays Fortnite',
      description: 'Doing the things Ninja does! ',
      start_time: 0,
      is_active: true,
      photo: 'https://images.firstpost.com/wp-content/uploads/2019/08/ninja-streamer.jpg'

    },
    {
      id: 5,
      user_id: 5,
      title: 'Pokimane\'s New Home: Br3ezy',
      description: 'Pokimane settling in to her new digs at Br3ezy after ending her contract with Twitch. ',
      start_time: 0,
      is_active: true,
      photo: 'https://dotesports.com/wp-content/uploads/2022/06/20005308/Feature-Image-18.jpg'

    },
  ]


  getAllStreamListings(): StreamListing[] { // a nice function that returns the entire StreamListing array from above
    return this.streamListingList;
  }

  getStreamListingById(id: number) : StreamListing | undefined { // another cool function to get listings by their ID
    return this.streamListingList.find(streamListing => streamListing.id === id);
  }

}
