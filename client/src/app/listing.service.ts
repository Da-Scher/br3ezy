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

  // get all streams by searching with an empty keyword
  async getAllStreamListings(): Promise<StreamListing[]> { 
    const response = await fetch(`${this.url}/search?keyword=`);
    const { data } = await response.json();
    console.log("Got data object:", data);

    return data ?? [];
  }

  // get a single stream listing by its id
  async getStreamListingById(id: number) : Promise<StreamListing | undefined> { 
    console.log("Listing service request stream id: ", id);
    const response = await fetch(`${this.url}/get/${id}`);
    const { data } = await response.json();
    console.log("Got data object:", data);
    
    return data ?? {};
  }

  // update a stream listing
  async patchListingById(id: number, request: any) : Promise<Boolean> {

    // build a request
    const req = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    }

    // send out the request, await the response
    const response = await fetch(`${this.url}/${id}`, req);
    if (response.ok){
      return true;
    } else {
      return false;
    }
  }

}