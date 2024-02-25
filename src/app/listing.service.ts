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
    return data ?? {};
  }

}
