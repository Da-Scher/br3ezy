import { Injectable } from '@angular/core';
import { StreamListing } from './streamlisting';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private http: HttpClient) { }

  // stream API url
  url = 'https://localhost:8000/api/stream';

  async getAllStreamListings(): Promise<StreamListing[]> { // get all streams by searching with an empty keyword
    const response = await fetch(`${this.url}/search?keyword=`);
    const { data } = await response.json();
    return data ?? [];
  }

  async getStreamListingById(id: number) : Promise<StreamListing | undefined> { // get a single stream listing by its id
    console.log("Listing service request stream id: ", id);
     const response = await fetch(`${this.url}/get/${id}`);
     const { data } = await response.json();


    console.log("Got data object:", data);

    const streamListing: StreamListing = {
      description: data.stream.description,
      id: data.stream.id,
      is_active: data.stream.is_active,
      photo: data.stream.photo,
      start_time: data.stream.start_time,
      title: data.stream.title,
      user_id: data.stream.user_id
    }

    console.log("Returning streamListing ID: ", streamListing.id);
    return streamListing ?? {};
  }

}